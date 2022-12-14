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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}





mongoose.set('strictQuery', false);

app.listen(PORT, ()=>{
	console.log('listening');

})

mongoose.connect(`mongodb+srv://star:HdaNcn7ArQrVJeam@exerciseproject.4ry2dxj.mongodb.net/?retryWrites=true&w=majority`,()=>{
  console.log('connected to mongo');
})
