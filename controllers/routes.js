const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Recipes = require('../models/recipes.js')

//======================//
//========ROUTES=======//
//======================//

// Recipes.updateMany({}, {$unset: {ratings: 1}}, (err, deletedRecipes)=>{
//   console.log(deletedRecipes)
// })

//========CREATE/POST ROUTE=======ADD CAR
router.post('/', (req, res) => {
    Recipes.create(req.body, (err, createdRecipe) =>{
        res.json(createdRecipe);
    });
  });

  //===========Search Route==========
  router.get('/search/:search', (req, res) => {
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
  //========Time Filter Route==========

  //========Less than or equal to 30=======
  router.get('/timeless',(req,res)=>{
    Recipes.find({timeToPrepare: {$lte:30} },(err,showFilter)=>{
      res.json(showFilter)
    })
  })
  //========Greater than 30===========
  router.get('/timemore',(req,res)=>{
    Recipes.find({timeToPrepare: {$gt:30} },(err,showFilter)=>{
      res.json(showFilter)
    })
  })  
  //=========Favs Filter Route=====================
  router.get('/favfilter/:id',(req,res)=>{
    Recipes.find({favs: req.params.id},(err,showFilter)=>{
        res.json(showFilter)
    })
  })

  //=========My Posts Filter Route===========================
  router.get('/myposts/:username',(req,res)=>{
    Recipes.find({submittedBy: req.params.username},(err,showFilter)=>{
        res.json(showFilter)
    })
  })

  //=========RATINGS ROUTE=====================================
  router.put('/rating/:id', (req, res)=>{
    Recipes.findByIdAndUpdate(req.params.id, {$push: {ratings: {user: req.body.user, rating: req.body.rating}}}, {new:true, upsert:true}, (err, updatedRecipe)=>{
        res.json(updatedRecipe);
    });
  });

  router.post('/alreadyrated/:id', (req, res)=> {
    Recipes.findByIdAndUpdate(req.params.id, {$pull: {ratings: {user:req.body.user}}}, {new:true}, (err, updatedRecipe)=>{
      console.log(updatedRecipe);
  });
});

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
