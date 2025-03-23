const saveRecipes = require('../models/saveRecipeModel')


// add to collection
exports.addToSaveRecipeController = async(req,res)=>{
    console.log("inside addToSaveRecipeController");
    const {id} = req.params
    const userId = req.userId
    const {name,image}= req.body
    console.log(id,userId,name,image);
    try{
        // check recipes already 
        const existingrecipe= await saveRecipes.findOne({recipeId:id,userId})
        if(existingrecipe){
            
            res.status(406).json("Seleted Recipes already in your collection..!!!")
        }else{
            // add recipes to  model
            const newRecipe = new saveRecipes({recipeId:id,name,image,userId})
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get recipe collection
exports.getUserRecipeController = async(req,res)=>{
    console.log("inside getUserRecipeController");
    const userId = req.userId

    try{
        // check recipes already 
        const userRecipeCollection = await saveRecipes.find({userId})
        res.status(200).json(userRecipeCollection)
    }catch(err){
        res.status(401).json(err)
    }
}
// remove user recipe
exports.removeUserRecipeController = async(req,res)=>{
    console.log("inside removeUserRecipeController");
    const {id} = req.params         
    try{
        const removeSaveRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeSaveRecipe)

    }catch(err){
        res.status(401).json(err)
    }
}