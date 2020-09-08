module.exports = {
    connectToDb() {
        const config = require('./config.json');

        // Initialize database connection
        const {MongoClient} = require('mongodb');
        const uri = `mongodb+srv://survey_admin:${config.dbpass}@cluster0.jh2sm.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
        return new MongoClient(uri);
    }
}
