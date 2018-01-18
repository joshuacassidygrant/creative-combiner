const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

const u = require('../utility/utility');
const Data = require('../model/Data');
const Card = require('../model/Card');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.post('/', (req, res, next) => {

  console.log(JSON.stringify(req.body));
  var title = req.body.title;
  var comments = req.body.comments;
  console.log(req.body.category);
  var category = req.body.category;

  var newCard = new Card(title, comments, category);

  addCardToJson(newCard);
  res.json(newCard);

});

//Gets data, adds the card, then writes data to the file
var addCardToJson = (card) => {
  Data.getFileData()
  .then((data) => {
    data.cards.push(card);
    Data.saveFileData(data);
  })
  .catch((err) => {
    console.log(err);
  })
}


module.exports = router;
