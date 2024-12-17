const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/";


const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const dbName = 'customerDB'; 
const collectionName = 'customers'; 

const db = client.db(dbName);
const collection = db.collection(collectionName);

client.connect();

module.exports = { db, collection };

