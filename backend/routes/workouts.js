
const express = require('express')

//import the require auth middleware we created
const requireAuth = require('../middleware/requireAuth.js')

const {createWorkout, getAllWorkouts, getSingleWorkout, deleteSingleWorkout, updateWorkout } = require('../controllers/workoutController')


const router = express.Router();

// this makes sure the users are authenticated by the requireauth middleware before they can fire any of the http requests below
router.use(requireAuth)

// Create a workout
router.post('/', createWorkout)

// Get all workouts
router.get('/', getAllWorkouts)

// Get a single workout
router.get('/:id', getSingleWorkout)

// Update a workout
router.patch('/:id', updateWorkout)

// Delete a single workout
router.delete('/:id', deleteSingleWorkout)

module.exports = router