const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
{
    submittedBy: String,
    name: String,
    image: String,
    timeToPrepare: Number,
    mainIngredient: String,
    nationality: String,
    link:String,
    vegetarian: Boolean,
    spicy: Boolean,
    favs: Array,
    avgRating: Number,
    ratings: [{user: String, rating: Number}]
});

const Recipes = mongoose.model('Recipe', recipeSchema);

module.exports = Recipes;
