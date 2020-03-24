var url = 'http://myloggger.io/log';

const EventEmitter = require('events');

class Logger extends EventEmitter{
  log(message){
    //Send HTTP request
    console.log(message);
    //Raise an event
    this.emit('messageLogged',{id:1,url:'http://'});
  }

}

//module.exports.log = log;
//module.exports.endPoint = url;
// module.exports = log;
module.exports = Logger;
