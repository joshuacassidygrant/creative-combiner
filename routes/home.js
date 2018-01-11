var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', (req, res, next) => {
  res.render("index.pug", {slorp: "scoop zop bzam"});

});



module.exports = router;
