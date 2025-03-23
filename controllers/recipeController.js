const recipes = require('../models/recipeModel')


//get all recipes
exports.getAllRecipeController= async (req,res)=>{
    console.log("inside getAllRecipeController");
    try{
        const allrecipes = await recipes.find()
        res.status(200).json(allrecipes)
    }catch(err){
        res.status(401).json(err)
    }  
}

//get a recipes-Authorized user
exports.getARecipeController= async (req,res)=>{
    console.log("inside getARecipeController");
    // get dynamic value from url
    const {id} = req.params
    try{
        const allrecipes = await recipes.findById({_id:id})
        res.status(200).json(allrecipes)
    }catch(err){
        res.status(401).json(err)
    }  
}

//related recipes-Authorized user
exports.relatedRecipeController= async (req,res)=>{
    console.log("inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try{
        const allRelatedRecipes = await recipes.find({cuisine})
        res.status(200).json(allRelatedRecipes)
    }catch(err){
        res.status(401).json(err)
    }  
}

//Add recipes-Authorized user
exports.addRecipeController= async (req,res)=>{
    console.log("inside addRecipeController");
    const{name,ingredients,instruction,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try{

        const existingRecipe = await recipes.findOne({name})
        if(existingRecipe){
            res.status(406).json("Recipes Already in collection... Please Add another")
        }else{
            const newRecipe = new recipes({
                name,ingredients,instruction,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }

    }catch(err){
        res.status(401).json(err)
    }  
}

//update recipes-Authorized user
exports.updateRecipeController= async (req,res)=>{
    console.log("inside updateRecipeController");
    const {id} = req.params
    const{name,ingredients,instruction,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try{

      
            const updateRecipe = await recipes.find({
                name,ingredients,instruction,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        

    }catch(err){
        res.status(401).json(err)
    }  
}


//delete recipes-Authorized user
exports.deleteRecipeController= async (req,res)=>{
    console.log("inside deleteRecipeController");
    const {id} = req.params
    try{
            const removeRecipe = await recipes.findByIdAndDelete({_id:id})
            res.status(200).json(removeRecipe)
    }catch(err){
        res.status(401).json(err)
    }  
}