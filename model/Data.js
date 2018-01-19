var fs = require('fs');

//TODO: put this constant somewhere better
const fileDir = "data";
const fileName = "data.json";


function Data(categories, cards, templates){
    this.categories = categories;
    this.cards = cards;
    this.templates = templates;
}

function getEmptyData(){
  categories = [],
  cards = [],
  templates = []
  return new Data(categories, cards, templates);
}

var getFileData = () => {
  return new Promise((resolve, reject) => {
    var path = "./" + fileDir + '/' + fileName;
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        if(err.code === "ENOENT") {
          fs.open(path, 'wx', function(){
            var obj = getEmptyData();
            resolve(obj);
          })
        } else {
          throw err;
        }
      } else {
        if(data.length > 0){
          var obj = JSON.parse(data);
        } else{
          var obj = getEmptyData();
        }
        resolve(obj);
      }
    });
  });

}

var saveFileData = (data) => {
  var dataString = JSON.stringify(data);
  var path = "./" + fileDir + '/' + fileName;

  fs.writeFile(path, dataString, function(err){
    if(err){
        console.log(err);

    }
  })
}

var addTemplate = (template) => {
  var data = getFileData()
  .then((data) => {
    var found = false;

    for(let i = 0; i < data.templates.length; i++){
      if(data.templates[i].name === template.name){
        found = true;
      }
    }

    if(!found){
      data.templates.push(template);
      saveFileData(data);
      return template;
    } else {
      console.log("Template with given name already found");
      return null;
    }
  })
  .catch((err) =>{
    console.log(err);
  })
}

module.exports = {
  getFileData,
  saveFileData,
  addTemplate
}
