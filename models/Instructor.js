'use strict';

const mongoose = require('../mongoose-quickstart');

// Mongoose models accept two arguments, a string, which will be the name of our model, and a schema
const Instructor = mongoose.model('Instructor', {
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z]+$/, 'your name may only contain letters'] //custom error mesg for validation! Cool!
  },
  age: Number,
  skills: [String] //<--- an array of strings. Saving arrays in a db? Sacrilege!,
});

module.exports = Instructor;
