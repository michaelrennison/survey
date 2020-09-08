import Question from './question';
const mongoose = require('mongoose')

/**
 * Define the model for a category, a category will have three properties, a name, an array of the question
 * model and a theme colour
 */
var categorySchema = new mongoose.Schema({
    name: String,
    questions: [Question],
    themeColour: String
});

module.exports = mongoose.model('Category', categorySchema)
