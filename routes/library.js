const express = require('express');
const router = express.Router();
const u = require('../utility/utility')

const dataDir = "data";
const dataFile = "data.json";

router.get('/', (req, res, next) => {
  var dataContent = u.getFileData(dataDir, dataFile)
  .then((data) => {
    res.render('library.pug', {
      cards: data
    });
  })
  .catch((err) => {
    console.log(err);
  })
});


module.exports = router;
