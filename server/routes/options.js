const mysql = require('../db_connection');

module.exports = function(app) {
    // route function for getting a single categories questions
    app.get('/options/:key', async function(req, res) {
        // get the category id from the url
        const key = req.params.key;
        // define the query to execute
        const query = `SELECT * FROM site_options WHERE key='${key}'`
        // execute the query for getting all of the questions
        const option = await mysql.executeQuery(query).then((d) => {
            return d;
        }).catch(e => {
            return e
        });

        if(option instanceof Error) {
            res.status(500).send(option);
        } else {
            res.status(200).send(option);
        }
    });
}
