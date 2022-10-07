const jwt = require('jsonwebtoken')
const User = require('../models/User')

const workoutAuth = async (req,res,next) => {
   const {authorization} = req.headers
    
   if(!authorization) {
     return res.status(400).json({error: "token required"})
   }
//    console.log(authorization)
   
   const token = authorization.split(' ')[1]
   try {
    const {_id} = jwt.verify(token,process.env.SECRET)
   //  const user = await User.findOne({_id}).select('_id')
    req.user = _id
    next()
   } catch (error) {
    res.status(400).json({error: 'invalid token'})
   }

}

module.exports = workoutAuth