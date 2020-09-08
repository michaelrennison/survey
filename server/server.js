const express = require('express')
const app = express()
const port = 3000
// Connect to the database
const client = require('./db_connection').connectToDb();
client.connect().then(() => {
    console.log('Connected to database!')
}).catch(e => {
    console.log('Error connecting to database', e);
})
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})