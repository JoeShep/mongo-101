const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017/myproject';
let db = null;

// Use connect method to connect to the server
MongoClient.connect(url)
.then( (DB) => {
  db = DB;
  console.log("Connected successfully to server");
  // db.close();
  // After defining insertDocuments below, add this:
  return insertDocuments(db);
  // db.close();
})
.then( () => {
  // after adding findDocuments, do this:
  return findDocuments(db);
})
.then( (data) => {
  console.log('found data!', data);
})
.catch( (err) => {
  console.log(err);
});

// Just a test of dropping and adding data. Do not deploy code that does this if you want to preserve the data
const insertDocuments = (db) => {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  return collection.remove({}) // with no args, all items are removed from collection
  .then( () => {
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ]);
  });
};

var findDocuments = function(db) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  return collection.find({}).toArray();
};
