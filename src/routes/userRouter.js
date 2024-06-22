const express = require('express')
const bcrypt = require('bcrypt')
const userModel = require('../schemas/userSchema')

const userRouter = express.Router()

userRouter.get('/users',async(req,res)=>{
    try {
        const allUsers = await userModel.find()
        res.send(allUsers)
    } catch (error) {
        res.send(error+" : failed getting users")
    }
})

userRouter.get('/users/:id',async(req,res)=>{
    const id = req.params.id
    try {
        const selectedUsers = await userModel.findById(id)
        res.send(selectedUsers)
    } catch (error) {
        res.send(error+" : failed getting users")
    }
})

userRouter.post('/user/post',async(req,res)=>{
    const {userName,age,mobileNumber,emailID,password} = req.body
    try {
        const user = await userModel.findOne({emailID})
        if(user){
            res.send({message:"Email ID Already Exists"})
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new userModel({userName,age,mobileNumber,emailID,password:hashedPassword})
            await newUser.save()
            res.send(newUser)
        }
    } catch (error) {
        res.send(error+" : failed creating users") 
    }
})

userRouter.put('/users/:id',async(req,res)=>{
    const {userName,age,mobileNumber,emailID,password} = req.body
    const id = req.params.id
    try {
        const user = await userModel.findOne({emailID})
        if(user){
            res.send({message:"Email ID Already Exists"}) 
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
        await userModel.findByIdAndUpdate(id,{userName,age,mobileNumber,emailID,password:hashedPassword})
        res.send({message:"user updated"})
        }
    } catch (error) {
        res.send(error+" : failed updating users")
    }
})

userRouter.delete('/users/:id',async(req,res)=>{
    const id = req.params.id
    try {
         await userModel.findByIdAndDelete(id)
        res.send({message:"user deleted"})
    } catch (error) {
        res.send(error+" : failed deleting users")
    }
})


module.exports = userRouter

// $2b$10$4D6T3LsIRELdPcrzoTcvrOwD6GKFPpadED4WPqHF84zwQ0jV9Nfym
// $2b$10$cWzO5gD7ROMFnDMlJ9h1.O3u9Lqf7ZQIxED9Qqd7UOoqz/z0sPsre