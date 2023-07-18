
const express = require('express')

const {createWorkout, getAllWorkouts, getSingleWorkout, deleteSingleWorkout, updateWorkout } = require('../controllers/workoutController')

const router = express.Router()

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