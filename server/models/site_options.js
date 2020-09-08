import Question from './question';
const mongoose = require('mongoose')

/**
 * Define the model for site options, this will have two properties, a key and a value so site
 * options can be stored in the database and are not hardcoded into the application
 */
var siteOptionsSchema = new mongoose.Schema({
    key: String,
    value: String,
});

module.exports = mongoose.model('Category', siteOptionsSchema)
