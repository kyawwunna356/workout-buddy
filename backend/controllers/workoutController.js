const Workout = require('../models/Workout')
const mongoose = require('mongoose')
const validator = require('validator')

//get all workout
const getAllWorkouts = async (req,res) => {
    const user = req.user
    console.log(req.user)
    const allworkouts = await Workout.find({userId: user}).sort({createdAt: -1})
    console.log(allworkouts)
    res.status(200).send(allworkouts)
}



//create a workout
const createWorkout = async (req,res) => {
    const user = req.user
    const {title,reps,load} = req.body
    const emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).send({error: 'please fill out all the fields' , emptyFields})
    }

    try {
        const workout = await Workout.create({title,reps,load,userId: user})
        res.status(201).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})    }
    }

    //get a single workout
const getSingleWorkout = async (req,res) => {
    const {id} = req.params

    if(!validator.isMongoId(id)){
        return res.status(404).json({msg : 'Error: Workout not Found'})
    }

    const workout  = await Workout.findById(id)
    if(!workout) {
        return res.status(404).json({msg: 'Error: workout not Found'})
    } 
    res.status(200).json(workout)

    
    }


//delete Workout
const deleteWorkout = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg : 'Error: Workout not Found'})
    }
    const workout = await Workout.findByIdAndDelete(id)
    if(!workout) {
        return res.status(404).json({msg: 'Error: workout not Found'})
    } 
    
    res.status(200).json(workout)
}


//update a workout
const updateWorkout = async (req,res) => {
    const {id} = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'Error: Workout not Found'})
    }

    const workout = await Workout.findByIdAndUpdate(id,{...req.body})

    if(!workout) {
        return res.status(404).json({msg: 'Error: Workout not Found'})
    }

    res.status(200).json(workout)
}




module.exports = {
    getAllWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}