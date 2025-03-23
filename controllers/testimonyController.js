const testimonials = require('../models/testmonyModel')

// add testimony
exports.addTestimonyController = async (req,res)=>{
    console.log("inside addTestimonyController");
    const {name,email,message} = req.body
    try{
        const newTestimony = new testimonials({
            name,email,message
        })
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// add testimony
exports.getAllTestimonyController = async (req,res)=>{
    console.log("inside getAllTestimonyController");
    try{
        const allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// add testimony
exports.UpdateTestimonyController = async (req,res)=>{
    console.log("inside UpdateTestimonyController");
    const {id}= req.params
    const status = req.query.status
    try{
        const existingFeedback = await testimonials.findById({_id:id})
        existingFeedback.status = status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get approved testimony
exports.getApprovedTestimonyController = async (req,res)=>{
    console.log("inside getApprovedTestimonyController");
    try{
        const allFeedbacks = await testimonials.find({status:"Approved"})
        res.status(200).json(allFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
    
}