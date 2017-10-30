'use strict';

const mongoose = require('../mongoose-quickstart');

// We can define a schema separately then pass it into the model method
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instructor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }],
  days: [String]
});

// Mongoose models accept two arguments, a string, which will be the name of our model, and a schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
