const fs = require('fs');
const Category = require('../model/Category');

//TODO: put this constant somewhere better
const fileDir = "data";
const fileName = "data.json";


function Data(categories, cards, templates, activeTemplateIndex){
    this.categories = categories;
    this.cards = cards;
    this.templates = templates;
    this.activeTemplateIndex = activeTemplateIndex;
}

function getEmptyData(){
  categories = [],
  cards = [],
  templates = []
  activeTemplateIndex = -1;
  return new Data(categories, cards, templates, activeTemplateIndex);
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

function addCategory(name, colour) {
  var data = getFileData()
  .then((data) => {
    var nextId = 0;
    var found = false;


    for(let i = 0; i < data.categories.length; i++){
      if(data.categories[i].name === name){
        found = true;
      }
      nextId = Math.max(data.categories[i].id, nextId) + 1;
    }

    if(!found){
      var category = new Category.Category(nextId, name, colour);
      data.categories.push(category);
      saveFileData(data);
      return category;
    } else {
      console.log("Category with given name already found");
      return null;
    }
  })
  .catch((err) =>{
    console.log(err);
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

var addTemplateComponent = (templateName, categoryId) => {
  var data = getFileData()
  .then((data) => {
    data.templates.forEach((t) => {
      if(t.name == templateName){
        t.slots.push(categoryId);
      }
    })
    saveFileData(data);
  })
  .catch((err) =>{
    console.log(err);
  })
}

var changeActiveTemplate = (templateName) => {
  var data = getFileData()
  .then((data) => {
    data.activeTemplate = templateName;
    saveFileData(data);
  })
  .catch((err) =>{
    console.log(err);
  })
}

module.exports = {
  getFileData,
  saveFileData,
  addCategory,
  addTemplate,
  addTemplateComponent,
  changeActiveTemplate
}
