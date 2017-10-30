'use strict';

const express = require('express');
let bodyParser = require('body-parser');
const app = express();

// basic mongo demo
// require('./mongo-quickstart');

// more complicated demo with mongoose
const db = require('./mongoose-quickstart');
const Student = require('./models/Student');
const Course = require('./models/Course');
const Instructor = require('./models/Instructor');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/students', (req, res, next) => {
  // console.log('req.body', req.body );
  let newStudent = new Student({
    name: "LisaSimpson",
    age: 8,
    skills: ["Saxaphone", "math", "angst"]
  });
  newStudent.save() // will save to 'students' collection automagically (?)
  .then( (data) => {
    // We get the added obj back with its ID. AWESOME
    console.log('New student??', data );
    res.json(data);
  });
});

app.get('/students', (req, res, next) => {
  Student.find()
  .then( (students) => {
    // We get the added obj back with its ID. AWESOME
    console.log('all teh studentz', students ); // https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongodb
    res.json(students);
  });
});

// COURSES
app.get('/courses/:id', (req, res, next) => {
  Course.findOne({_id: req.params.id}).populate('instructor')
  .then( (course) => {
    // We get the added obj back with its ID. AWESOME
    console.log('course with instructor?', course );
    res.json(course);
  });
});

// Update with an instructor
app.put('/courses/:id', (req, res, next) => {
  Course.findByIdAndUpdate(req.params.id, {instructor: req.body.instructor_id}, {new: true}, (err, course) => {
    console.log('updated course?', course);
  });
});

db.then( () => {
  app.listen( 8080, () => {
    console.log("Listening on a cool port");
  });
})
.catch(console.error);
