const express = require('express')
const router = express.Router()
const {
    getAllWorkouts, 
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}  = require('../controllers/workoutController')
const  workoutAuth  = require('../middleware/workoutAuth')


router.use(workoutAuth)
//get all workouts
router.get('/', getAllWorkouts)


//get a single workout
router.get('/:id' , getSingleWorkout)

//post workout
router.post('/' ,createWorkout)

//delete
router.delete('/:id' ,deleteWorkout)

//update
router.patch('/:id' ,updateWorkout)

module.exports = router