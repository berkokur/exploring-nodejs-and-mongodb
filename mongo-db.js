const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = "127.0.0.1:27001";
const databaseName = "task-manager";


MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to the database');
    }

    const db = client.db(databaseName);
    
});