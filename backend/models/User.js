const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator  = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
}, {timestamps: true})

//static sign UP 
userSchema.statics.signUp = async function (email,password) {
    if(!email || !password){
        throw Error('Please fill out all the fields')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
   

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    const exist = await this.findOne({email})
    if(exist) {
        throw Error('email already in use')
    }

    
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password,salt)
    const user =  await this.create({email,password: hash})
    return user
}

//static Sign IN 
userSchema.statics.login = async function(email,password) {
    if(!email || !password) {
        throw Error("please fill out all the fields")
    }

    const user = await this.findOne({email})
    if(!user) {
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Invalid Password')
    }

    return user
}


module.exports = mongoose.model('User' , userSchema)

