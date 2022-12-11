const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const appRouter = require("./controllers/routes.js");
const Recipes = require('./models/recipes.js')
const userController = require('./controllers/users_controller.js')


//=========middle ware============
app.use(express.json());
app.use(cors());
app.use('/recipe',appRouter)
app.use('/user', userController)

//======================//
//========ROUTES=======//
//======================//

//========CREATE/POST ROUTE=======
app.post('/recipe', (req, res) => {
  Recipes.create(req.body, (err, createdRecipe) =>{
      res.json(createdRecipe);
  });
});


//========GET/READ ROUTE=======
app.get('/recipe', (req, res) => {
  Recipes.find({}, (err, foundRecipe) => {
      res.json(foundRecipe);
  });
});


//========DELETE ROUTE=======
app.delete('/recipe/:id', (req, res)=>{
  Recipes.findByIdAndRemove(req.params.id, (err, deletedRecipe)=>{
      res.json(deletedRecipe);
  });
});


//========UPDATE/EDIT ROUTE=======EDIT CAR
app.put('/recipe/:id', (req, res)=>{
  Recipes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedRecipe)=>{
      res.json(updatedRecipe);
  });
});



mongoose.set('strictQuery', false);

app.listen(3000, ()=>{
	console.log('listening');

})

mongoose.connect(`mongodb+srv://star:HdaNcn7ArQrVJeam@exerciseproject.4ry2dxj.mongodb.net/?retryWrites=true&w=majority`,()=>{
  console.log('connected to mongo');
})
