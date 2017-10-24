const mongoose = require('mongoose');
// Mongoose's promise library is depricated, so this allow us to use native es6 javascript promises.
mongoose.Promise = Promise;

const db = mongoose.createConnection('mongodb://localhost:27017/myproject', {
  useMongoClient: true,
  /* other options */
});

// https://www.tjvantoll.com/2015/12/29/console-error-bind/
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

module.exports = db;
