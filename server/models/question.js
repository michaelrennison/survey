import Answer from './answer';
const mongoose = require('mongoose')

/**
 * Define the model for a question, A question will have two properties, a title
 * which is to be displayed as the question being asked and an array of the answer
 * model to give the user the answer options
 */
var questionSchema = new mongoose.Schema({
    title: String,
    answers: [Answer]
});

module.exports = mongoose.model('Question', questionSchema);