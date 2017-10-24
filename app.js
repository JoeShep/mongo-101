'use strict';

const express = require('express');
let bodyParser = require('body-parser');
const app = express();
// basic mongo demo
// require('./mongo-quickstart');

// more complicated demo with mongoose
const db = require('./mongoose-quickstart');
const Student = require('./models/Student');

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

db.then( () => {
  app.listen( 8080, () => {
    console.log("Listening on a cool port");
  });
})
.catch(console.error);
