
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static method - for the sign up controller logic
userSchema.statics.signup = async function (email, password) {

  // check if email or password fields were actually submitted 
  if (!email || !password) {
    throw Error('All fields are required!')
  }
  // use validator to confirm email & password format
  if (!validator.isEmail(email)) {
    throw Error('Not a valid email address')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }
  
  //check if the email is already in use
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('This email is already is use')
  }

  // hashing user password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email: email, password: hash })
  
  return user
}

// static method - for the log in controller logic
userSchema.statics.login = async function (email, password) {

  // check if email or password fields were actually submitted 
  if (!email || !password) {
    throw Error('All fields are required!')
  } 

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('incorrect email')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw Error('incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)