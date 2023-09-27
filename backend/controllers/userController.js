
const jwt = require('jsonwebtoken')
// import the user model
const userModel = require("../models/userModel")

// testing backend
// const getUsers = async (req, res) => {
//   const users = await userModel.find({}).sort({ createdAt: -1 })
//   res.status(200).json(users)
// }

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// user login
const loginUser = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await userModel.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}


// user sign up 
const signupUser = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await userModel.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}

module.exports = {loginUser, signupUser}