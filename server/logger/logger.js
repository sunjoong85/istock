let fs = require('fs');

module.exports = {
  log : function(msg) {
      let date = new Date();
      let logMsg = '[' + date.toString() + '] ' + msg + '\r\n';

      fs.appendFile('log.txt', logMsg, (e) => {
          if(e) {
            console.log(e);
          }
      });
  }
}
