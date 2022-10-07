const express = require('express')
const { login , signUp} = require('../controllers/userController')
const router = express.Router()

//login
router.post('/login' ,  login)


// sign up
router.post('/signup' , signUp)

module.exports = router