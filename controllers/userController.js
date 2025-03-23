const users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register
exports.addUserController = async (req,res)=>{
    console.log("inside addUserController");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("user Already Exist.. please login...")
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:encryptedPassword,profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}
// login
exports.loginController = async (req,res)=>{
    console.log("inside loginController");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            let isPasswordMatch = await bcrypt.compare(password,existingUser.password)
            if(isPasswordMatch || password==existingUser.password){
                const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
                res.status(200).json({user:existingUser,token})
            }else{
                res.status(404).json("Invaild Password")
            }
        }else{
            res.status(404).json("Invaild Email/Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//  edit user
exports.editUserController = async (req,res)=>{
    console.log("inside editUserController");
    const {profilePic} = req.body
    const userId = req.userId
    try{
        const existingUser = await users.findById({_id:userId})
        existingUser.profilePic = profilePic
        await existingUser.save()
        res.status(200).json(existingUser)
    }catch(err){
        res.status(401).json(err)
    }
}

//  edit user
exports.getAllUserController = async (req,res)=>{
    console.log("inside getAllUserController");
    try{
        const allusers = await users.find()
        res.status(200).json(allusers)
    }catch(err){
        res.status(401).json(err)
    }
}

