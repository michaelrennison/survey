const mysql = require('../db_connection');

module.exports = function(app){
    app.get('/categories', async function(req, res){
        const categories = await mysql.executeQuery("SELECT * FROM categories").then((d) => {
            return d;
        })
        res.status(200).send(categories);
    });
    //other routes..
}
