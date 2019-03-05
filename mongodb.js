const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017"; //why not localhost : because it causes to latency problems- just write ip address directly
const databaseName = "task-manager";

//mongo db connection object
mongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database...");
    } else {
      console.log("Connected correctly");
      const db = client.db(databaseName); //db object
      db.collection("users").insertOne({
        name: "Berk",
        age: 35
      });
    }
  }
);
