const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
{
    name: String,
    image: String,
    timeToPrepare: Number,
    mainIngredient: String,
    nationality: String,
    link:String,
    vegetarian: Boolean,
    spicy: Boolean
});

const Recipes = mongoose.model('Recipe', recipeSchema);

module.exports = Recipes;
