const express = require('express')
const recipeController= require('../controllers/recipeController')
const testimonyController = require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const downloadRecipeController = require('../controllers/downloadRecipeController')
const saveRecipeController = require('../controllers/saveRecipeController')
const downloadRecipes = require('../models/downloadModel')


const router = new express.Router()

// all -recipes
router.get("/get-recipes",recipeController.getAllRecipeController)

// add -tesimony
router.post("/add-testimony",testimonyController.addTestimonyController)

// register
router.post("/register",userController.addUserController)

// login
router.post("/login",userController.loginController)

// view - single -recipes
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getARecipeController)

// related Recipe
router.get("/related-recipes",jwtMiddleware,recipeController.relatedRecipeController)

// download Recipe
router.post("/recipe/:id/download",jwtMiddleware,downloadRecipeController.addToDownloadRecipeController)

// download Recipe
router.post("/recipe/:id/save",jwtMiddleware,saveRecipeController.addToSaveRecipeController)

// download Recipe
router.get("/get-save-recipes",jwtMiddleware,saveRecipeController.getUserRecipeController)

// download Recipe
router.get("/save-recipes/:id/remove",jwtMiddleware,saveRecipeController.removeUserRecipeController)

// download Recipe
router.get("/user-downloads",jwtMiddleware,downloadRecipeController.getUserDownloadRecipeController)

// edit-user
router.post("/user/edit",jwtMiddleware,userController.editUserController)

// get all users
router.get("/all-users",jwtMiddleware,userController.getAllUserController)

// download list
router.get("/download-list",jwtMiddleware,downloadRecipeController.getAllDownloadRecipeController)

// get -tesimony
router.get("/get-testimony",jwtMiddleware,testimonyController.getAllTestimonyController)

// update -tesimony
router.get("/feedback/:id/update",jwtMiddleware,testimonyController.UpdateTestimonyController)

// get-approved-tesimony
router.get("/get-approved-testimony",testimonyController.getApprovedTestimonyController)

// add-recipe
router.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)

// update-recipe
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.updateRecipeController)

// update-recipe
router.delete("/recipe/:id/delete",jwtMiddleware,recipeController.deleteRecipeController)

module.exports = router                                                     