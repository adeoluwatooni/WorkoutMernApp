
const jwt = require('jsonwebtoken')
// import the user model
const userModel = require("../models/userModel")




const createToken = (id) => {
  return jwt.sign()
}

// user login
const loginUser = async (req, res) => {
  res.json({mssg:"user log in"})
}


// user sign up 
const signupUser = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await userModel.signup(email, password)

    res.status(200).json({email, user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}

module.exports = {loginUser, signupUser}