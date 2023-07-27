

// user login
const loginUser = async (req, res) => {
  res.json({mssg:"user log in"})
}


// user sign up 
const signupUser = async (req, res) => {
  res.json({mssg:"user sign up"})
}

module.exports = {loginUser, signupUser}