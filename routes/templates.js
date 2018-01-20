const express = require('express');
const router = express.Router();
const u = require('../utility/utility');
const Data = require('../model/data');
const Category = require('../model/Category');

const dataDir = "data";
const dataFile = "data.json";

const defaultColours = [
  '#0E7C7B', //medblue
  '#00487C', //dblue
  '#B8B42D', //yellow
  '#D62246', //magenta
  '#37392E' //darkgray
];


router.get('/', (req, res, next) => {
  var dataContent = Data.getFileData(dataDir, dataFile)
  .then((data) => {
    var templates = Category.attachCategoriesToTemplates(data.templates, data.categories);
    console.log(JSON.stringify(templates));
    res.render('templates.pug', {
      categories: data.categories,
      templates: templates
    });
  })
  .catch((err) => {
    console.log(err);
  })
});


module.exports = router;
