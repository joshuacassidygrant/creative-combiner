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
  var templateName = req.body.templateName;
  var categoryId = req.body.category;
  Data.addTemplateComponent(templateName, categoryId);
});


module.exports = router;
