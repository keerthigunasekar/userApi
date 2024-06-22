const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    age:{type:Number,required:true},
    mobileNumber:{type:Number,required:true},
    emailID:{type:String,required:true},
    password:{type:String,required:true},
})

const userModel = mongoose.model("usersData",userSchema)

module.exports = userModel