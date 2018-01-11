var express = require('express');
var router = express.Router();
var u = require('../utility/utility')

const dataDir = "data";

router.get('/', (req, res, next) => {
  var dataContent = u.getJson();
  res.json(JSON.parse(dataContent));
  next();
});


module.exports = router;
