const express = require('express');
const router = express.Router();
const u = require('../utility/utility');
const Data = require('../model/data');
const Category = require('../model/Category');

const dataDir = "data";
const dataFile = "data.json";

router.get('/', (req, res, next) => {
  var dataContent = Data.getFileData(dataDir, dataFile)
  .then((data) => {
    res.render('library.pug', {
      cards: data.cards,
      categories: data.categories,
      templates: data.templates
    });
  })
  .catch((err) => {
    console.log(err);
  })
});


module.exports = router;
