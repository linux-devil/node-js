const path = require('path');
const os = require('os');
const fs  = require('fs');
const http = require('http');

const server = http.createServer((req,res)=>{
  if(req.url==='/'){
    res.write('Hello world');
    res.end();
  }
  if(req.url==='/api/courses'){
    res.write(JSON.stringify([1,2,3]));
    res.end();
  }
});


/***
server.on('connection',(socket)=>{
  //console.log('new connection...');
})
*/

server.listen(3000);
console.log('Listening on port 3000');



const EventEmitter = require('events');
//const emitter = new EventEmitter();


//const logger = require('./logger');
const Logger = require('./logger');
const logger = new Logger();
logger.log('message');

//Register listener

logger.on('messageLogged',function(arg){
  console.log('Listener called',arg);
  console.log(arg);
});



//const files = fs.readdirSync('./')
//console.log(files);
//const files = fs.readdir('./',callbac())

fs.readdir('$',function(err,files){
  if(err) console.log('Error',err);
  else console.log('Result',files);
})


var totalMemory = os.totalmem();
var freeMem = os.freemem();

var pathObj = path.parse(__filename);
console.log(pathObj);
console.log('Total memory: '+totalMemory);


console.log(`Total Memory:${totalMemory}`);
console.log(`Free Memory:${freeMem}`);



console.log(logger);
logger.log('message');

var sayHello = function(){
  console.log('hello world');
}
console.log('Hello world from nodejs'); // console is global

//console.log(module);
//setTimeout()
//clearTimeout()

//setInterval() // to call functions after repeated interval
//clearInterval()
