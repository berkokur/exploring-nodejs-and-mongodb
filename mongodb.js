// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"; //why not localhost : because it causes to latency problems- just write ip address directly
const databaseName = "task-manager";

//mongo db connection object
// mongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       console.log("Unable to connect to database...");
//     } else {
//       console.log("Connected correctly");
//       const db = client.db(databaseName); //db object
//       db.collection("users").insertOne({
//         name: "Berk",
//         age: 35
//       });
//     }
//   }
// );


//5c7f646c42825e16409ed8fa

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to the database');
  }

  const db = client.db(databaseName);
  const updatePromise = db.collection('users').updateOne({ _id: new ObjectID("5c7f646c42825e16409ed8fa") }, {
    $set: {
      name: 'Nilufer'
    }, $inc: {
      age: 2
    }
  });

  updatePromise.then((result) => { console.log(result) }).catch((error) => { console.log(error) });
});