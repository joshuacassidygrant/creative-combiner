const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

const u = require('../utility/utility');
const Data = require('../model/Data');
const Category = require('../model/Category');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



router.post('/', (req, res, next) => {
  console.log(JSON.stringify(req.body));
  var name = req.body.name;
  var colour = req.body.colour;
  var category = Data.addCategory(name, colour);
  res.json(category);

});


module.exports = router;
