const mongoose = require('mongoose')

/**
 * Define the model for an answer. An answer will have two properties, a title which will be
 * displayed to the user, and a value that represents the answer that will be used in the calculations
 * when the answer is submitted
 */
var answerSchema = new mongoose.Schema({
    title: String,
    value: Number
});

module.exports = mongoose.model('Answer', answerSchema);
