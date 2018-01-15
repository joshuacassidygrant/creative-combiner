const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

const u = require('../utility/utility');
const Card = require('../model/Card');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




//TODO: put this constant somewhere better
const fileDir = "data";
const fileName = "data.json";


router.post('/', (req, res, next) => {

  console.log(JSON.stringify(req.body));
  var title = req.body.title;
  var comments = req.body.comments;
  var category = req.body.category;

  var newCard = new Card(title, comments, category);

  addCardToJson(newCard);
  res.json(newCard);

});

var addCardToJson = (card) => {

  u.getFileData(fileDir, fileName)
  .then((data) => {
    data.push(card);
    dataString = JSON.stringify(data);

    var path = "./" + fileDir + '/' + fileName;

    fs.writeFile(path, dataString, function(err){
      if(err){
          console.log(err);

      }
    })
  })
  .catch((err) => {
    console.log(err);
  })
}


module.exports = router;
