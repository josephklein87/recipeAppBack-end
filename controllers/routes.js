const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Recipes = require('../models/recipes.js')

//======================//
//========ROUTES=======//
//======================//

//========CREATE/POST ROUTE=======ADD CAR
router.post('/recipe', (req, res) => {
    Recipes.create(req.body, (err, createdRecipe) =>{
        res.json(createdRecipe);
    });
  });
  
  
  //========GET/READ ROUTE=======GET CAR
  router.get('/recipe', (req, res) => {
    Recipes.find({}, (err, foundRecipe) => {
        res.json(foundRecipe);
    });
  });
  
  
  //========DELETE ROUTE=======DELETE CAR
  router.delete('/recipe/:id', (req, res)=>{
    Recipes.findByIdAndRemove(req.params.id, (err, deletedRecipe)=>{
        res.json(deletedRecipe);
    });
  });
  
  
  //========UPDATE/EDIT ROUTE=======EDIT CAR
  router.put('/recipe/:id', (req, res)=>{
    Recipes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedRecipe)=>{
        res.json(updatedRecipe);
    });
  });

  module.exports = router