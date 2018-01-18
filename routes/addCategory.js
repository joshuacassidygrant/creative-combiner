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




//TODO: put this constant somewhere better
const fileDir = "data";
const fileName = "data.json";


router.post('/', (req, res, next) => {
  console.log(JSON.stringify(req.body));
  var name = req.body.name;
  var category = Category.addCategory(name);
  res.json(category);

});


module.exports = router;
