var express = require('express');
var router = express.Router();
var fs = require('fs');
var u = require('../utility/utility');

var Card = require('../model/Card');

//TODO: put this constant somewhere better
const dataDir = "data";

router.post('/', (req, res, next) => {
  console.log("Query" + req.body.title);
  var title = req.body.title;
  var comments = req.body.comments;
  var category = req.body.category;

  var newCard = new Card(title, comments, category);

  addCardToJson(newCard);
  next();
});

var addCardToJson = (card) => {
  if(!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
  }

  var jsonData = JSON.parse(u.getJson());
  console.log(jsonData);
  jsonData.push(card);
  console.log(jsonData);

  jsonData = JSON.stringify(jsonData);

  fs.writeFile(dataDir + "/data.json", jsonData, function(err){
    if(err){
      console.log(err);
    }
  })
}


module.exports = router;
