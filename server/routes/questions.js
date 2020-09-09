const mysql = require('../db_connection');

module.exports = function(app) {
    // route function for getting a single categories questions
    app.get('/questions/:id', async function(req, res) {
        // get the category id from the url
        const questionId = req.params.id;
        // define the query to execute
        const query = `SELECT * FROM answers WHERE question_id='${questionId}'`
        // execute the query for getting all of the questions
        const qustion = await mysql.executeQuery(query).then((d) => {
            return d;
        }).catch(e => {
            return e
        });

        if(qustion instanceof Error) {
            res.status(500).send(qustion);
        } else {
            res.status(200).send(qustion);
        }
    });
}
