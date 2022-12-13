const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Recipes = require('../models/recipes.js')

//======================//
//========ROUTES=======//
//======================//

//========CREATE/POST ROUTE=======ADD CAR
router.post('/', (req, res) => {
    Recipes.create(req.body, (err, createdRecipe) =>{
        res.json(createdRecipe);
    });
  });

  //===========Search Route==========
  router.post('/search/:search', (req, res) => {
    const searchResult = req.params.search
    const regex = new RegExp (searchResult,'i')

    Recipes.find({$or: [{name:regex},{mainIngredient:regex},{nationality:regex}]}, (err, showRecipe) =>{
        res.json(showRecipe);
    });
  });

  //=========Spicy Filter Route===========
  router.get('/spicy',(req,res)=>{
    Recipes.find({spicy:true},(err,showFilter)=>{
        res.json(showFilter)
    })
  })
  //=======Vegetarian Filter Route =========
  router.get('/vegan',(req,res)=>{
    Recipes.find({vegetarian:true},(err,showFilter)=>{
        res.json(showFilter)
    })
  })

  //=========Favs Filter Route=====================
  router.get('/favfilter/:id',(req,res)=>{
    Recipes.find({favs: req.params.id},(err,showFilter)=>{
        res.json(showFilter)
    })
  })


  //========GET/READ ROUTE=======GET CAR
  router.get('/', (req, res) => {
    Recipes.find({}, (err, foundRecipe) => {
        res.json(foundRecipe);
    });
  });


  //========DELETE ROUTE=======DELETE CAR
  router.delete('/:id', (req, res)=>{
    Recipes.findByIdAndRemove(req.params.id, (err, deletedRecipe)=>{
        res.json(deletedRecipe);
    });
  });


  //========UPDATE/EDIT ROUTE=======EDIT CAR
  router.put('/:id', (req, res)=>{
    Recipes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedRecipe)=>{
        res.json(updatedRecipe);
    });
  });

  //=======FAVS ROUTES=====================
  router.put('/fav/:id/:up', (req, res) =>{
    Recipes.findOneAndUpdate({_id: req.params.id}, {$push:{favs: req.params.up}}, {new:true}, (err, updatedRecipe)=>{
      res.json(updatedRecipe)
    })
  })

  router.put('/unfav/:id/:up', (req, res) =>{
    Recipes.findOneAndUpdate({_id: req.params.id}, {$pull :{favs: req.params.up}}, {new:true}, (err, updatedRecipe)=>{
      res.json(updatedRecipe)
    })
  })

  module.exports = router
