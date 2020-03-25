const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
/**
app.get();
app.post();
app.put();
app.delete();
*/
const courses = [
  {id:1,name:'course1'},
  {id:2,name:'course2'},
  {id:3,name:'course3'},
];

app.get('/',(req,res)=>{
  res.send('Hello World!!!');
});

app.get('/api/courses',(re,res)=>{
  res.send(courses);
});

// PORT

const port = process.env.PORT || 3000;

//api/courses/1
// GET REQUEST
app.get('/api/courses/:id',(req,res) => {
  //res.send(req.params.id);
  var course = courses.find( c => c.id== parseInt(req.params.id));
  //res.send(req.query);
  if(!course) res.status(404).send('given id not present');//404
  res.send(course);
});

app.get('/api/posts/:year/:month',(req,res) =>{
  //res.send(req.params.year);
  //res.send(req.params);
  res.send(req.query);
});

//POST REQUEST
app.post('/api/courses',(req,res)=>{

  const schema = {
    name: Joi.string().min(3).required()
  };
  const result = Joi.validate(req.body,schema);
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //console.log(result);
  /**
  if(!req.body.name || req.body.name.length<3){
    //res.status(400).send('name is short');//400
    return;
  }
  */
  const course = {
    id:courses.length+1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});


//PUT request

app.put('/api/courses/:id',(req,res) => {
  // look up course
  var course = courses.find( c => c.id== parseInt(req.params.id));

  // if not exist 404
  if(!course) {
    res.status(404).send('given id not present');//404
    return;
}
  // validate
  const {error} = validateCourse(req.body);
  //if invalid , return 404
  //console.log(error);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }

  //update course
  course.name = req.body.name;
  res.send(course);
  //return the updated course
});

//Delete  Request

app.delete('/api/courses/:id',(req,res) => {
  var course = courses.find( c => c.id== parseInt(req.params.id));

  // if not exist 404
  if(!course) {
    res.status(404).send('given id not present');//404
    return;
  }
  const index = courses.indexOf(course)
  courses.splice(index,1);
  res.send(course);
});



function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course,schema);
}

app.listen(port,()=>
  console.log(`listening on port ${port}`));
