

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

// static method
userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email })
  
  if (exists) {
    throw Error('This email is already is use')
  }

  
}

module.exports = mongoose.model('User', userSchema)