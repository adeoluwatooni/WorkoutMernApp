
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// Express App
const app = express()

// Use CORS middleware to enable cross-origin requests
const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, POST, PUT, PATCH, DELETE',
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions));

app.set('trust-proxy', 100)
app.use(helmet)
app.use(xss)

// middleware
app.use(express.json())

// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   next()
// })

//react to the request object
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connecting to Mongodb Atlas database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // To listen for client requests
    app.listen(process.env.PORT, () => {
      console.log(' Connected to Atlas database and listening on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })