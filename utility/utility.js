var fs = require('fs');


var getFileData = (fileDir, fileName) => {
  return new Promise((resolve, reject) => {
    var path = "./" + fileDir + '/' + fileName;
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        if(err.code === "ENOENT") {
          fs.open(path, 'a+', function(){
            var obj = [];
            resolve(obj);
          })
        } else {
          throw err;
        }
      } else {
        if(data.length > 0){
          var obj = JSON.parse(data);
        } else{
          var obj = [];
        }
        resolve(obj);
      }
    });
  });

}

module.exports = {
  getFileData
}
