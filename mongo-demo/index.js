const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(()=>console.log('connected to db'))
  .catch(err => console.error('couldnt connect',err));

  /** 
const courseSchema = new mongoose.Schema({
  name : String,
  author : String,
  tags : [String],
  date : {type:Date, default:Date.now},
  isPublished:Boolean,
  price: Number
});
*/


const courseSchema = new mongoose.Schema({
  name : {type:String,
    required:true,
    minlength:5,
    maxlength:255,
    },
    category:{type:String,
    enum:['web','mobile']},
  author : String,
  //tags : [String],
  tags:{
    type:Array,
    validate:{
      isAsync:true,
      validator:function(v,callback){
      setTimeout(()=>{
        const result = v && v.length;
        callback(result);
      },2000);
      },
      message:'course atleast 1 text'
    }
  },
  date : {type:Date, default:Date.now},
  isPublished:Boolean,
  price: {type:Number,
  required:function(){return this.isPublished;}}
});


const Course =  mongoose.model('Course',courseSchema);

async function createCourse(){ 
const courseObj = new Course({
  name: 'Nodejs',
  author:'harshit',
  tags:['node','backend'],
  isPublished:true
})
try {
  //const isValid = await courseObj.validate();
  const result = await courseObj.save();
  console.log(result);
}
catch(ex){
  console.log(ex.message);
}
};

//eq : equal
// ne not equal
// gt greater than
// gte greater than or equal to
//lt less than
// in
// nin not in
// or and 
async function getCourse(){
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
  //.find({author:'harshit','isPublished':true})
  //.find({price:{$gt:10, $lt:20}})
  //.find({price : {$in:[10,20,50]}})
  .find()
  .skip((pageNumber-1)*pageSize)
  .limit(pageSize)
  .or([{author:'harshit'},{isPublished:true}])
  .limit(1)
  .sort({name:1})
  //.count()
  .select({name:1,tags:1});
  console.log(courses);
}

//getCourse();
createCourse();