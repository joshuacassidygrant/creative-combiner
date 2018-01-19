const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

const u = require('../utility/utility');
const Data = require('../model/Data');
const Template = require('../model/Template');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.post('/', (req, res, next) => {
  console.log(JSON.stringify(req.body));
  var templateName = req.body.templateName;
  var categoryName = req.body.category;

  //TODO finish this implementation

  res.json(template);

});


module.exports = router;
