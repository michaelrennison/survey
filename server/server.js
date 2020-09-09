const express = require('express')
const mysqllib = require('./db_connection')
const app = express()
const port = 3000
// require routes related to categories
require('./routes/categories')(app);
// require routes related to questions
require('./routes/questions')(app);
// Connect to the database

mysqllib.connect().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}).catch(err => {
    console.log('connection error');
    console.log(err);
})
