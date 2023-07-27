// const { response } = require('express')
const workoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')


// Create a workout <------------------------------------------------------>
const createWorkout = async (request, response) => {
  const { title, reps, load } = request.body
  const emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return response.status(400).json({error: 'please fill in all the input fields', emptyFields})
  }

  //add a document to your database
  try {
    const workout = await workoutModel.create({ title, reps, load })
    response.status(200).json(workout)
  } catch (error) {
    response.status(400).json({error: error.message })
  }
}


// Get all workouts <------------------------------------------------------>
const getAllWorkouts = async (request, response) => {
  const workout = await workoutModel.find({}).sort({createdAt: -1})

  response.status(200).json(workout)
}


// Get single workout <------------------------------------------------------>
const getSingleWorkout = async (request, response) => {
  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({error: "Invalid ID, Workout Not Found"})
  }

  const workout = await workoutModel.findById(id)

  if (workout) {
    response.status(200).json(workout)
  } else {
    response.status(404).json({error: "Workout Not Found"})
  }
}  

// Update a workout <------------------------------------------------------>
const updateWorkout = async (request, response) => {

  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({error: "Invalid ID, Workout Not Found"})
  }

  const workout = await workoutModel.findByIdAndUpdate({ _id: id }, { ...request.body })
  
  if (workout) {
    response.status(200).json(await workoutModel.findById({ _id: id }))
  } else {
    response.status(404).json({error: "Workout Not Found"})
  }
}


// Delete a single workout <------------------------------------------------------>
const deleteSingleWorkout = async (request, response) => {
  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({error: "Invalid ID, Workout Not Found"})
  }

  const workout = await workoutModel.findByIdAndDelete({ _id: id })
  
  if (workout) {
    response.status(200).json(await workoutModel.find({}))
  } else {
    response.status(404).json({error: "Workout Not Found"})
  }
}


// exporting the workout controllers <------------------------------------------------------>
module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteSingleWorkout,
  updateWorkout
}