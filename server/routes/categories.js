const mysql = require('../db_connection');

module.exports = function(app) {
    // Route function for getting all categories
    app.get('/categories', async function(req, res){
        const categories = await mysql.executeQuery("SELECT * FROM categories").then((d) => {
            return d;
        }).catch(e => {
           return e;
        });

        // check if the database returned an error
        if(categories instanceof Error) {
            res.status(500).send(categories);
        } else {
            res.status(200).send(categories);
        }
    });

    // route function for getting a single categories questions
    app.get('/categories/:id', async function(req, res) {
        // get the category id from the url
        const categoryId = req.params.id;
        // define the query to execute
        const query = `SELECT * FROM questions WHERE category_id='${categoryId}'`
        // execute the query for getting all of the questions
        const category = await mysql.executeQuery(query).then((d) => {
           return d;
        }).catch(e => {
            return e
        });

        if(category instanceof Error) {
            res.status(500).send(category);
        } else {
            res.status(200).send(category);
        }
    });
}
