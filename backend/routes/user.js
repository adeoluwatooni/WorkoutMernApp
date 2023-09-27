
const express = require('express')
const router = express.Router()

// importing controller functions
const {loginUser, signupUser} = require('../controllers/userController')

// login route
router.post('/login', loginUser)

// signup Route
router.post('/signup', signupUser)


module.exports = router