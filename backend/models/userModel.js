
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

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
  
  //check if the email is already in use
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('This email is already is use')
  }

  // hashing user password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

}

module.exports = mongoose.model('User', userSchema)