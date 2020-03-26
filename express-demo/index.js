const config = require('config');
const Joi = require('joi');
const morgan = require('morgan');
const express = require('express');
const app = express();
const logger = require('./logger');
const courses = require('./routes/courses');
const homepage = require('./routes/home');
const auth = require('./auth');
const startup_debugger = require('debug')('app:startup')
const db_debugger = require('debug')('app:db')
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app:${app.get('env')}`);


if (app.get('env')=='development'){
  app.use(morgan('tiny'));
  startup_debugger('Morgan enabled...');
}

//Configuration
console.log('Appication name :'+config.get('name'));
console.log('Pasword:'+config.get('pass'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
// other middleware morgan , helmet
db_debugger('connected to db');
app.use(logger);
app.use(auth);
app.use('/api/courses',courses);
app.use('/',homepage);
/**
app.get();
app.post();
app.put();
app.delete();
*/
// PORT
const port = process.env.PORT || 3000;

//api/courses/1
// GET REQUEST

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course,schema);
}

app.listen(port,()=>
  console.log(`listening on port ${port}`));
