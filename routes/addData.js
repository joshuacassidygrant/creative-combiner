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

  var title = req.body.title;
  var comments = req.body.comments;
  var category = req.body.category;
  var newCard = new Card.Card(title, comments, category);

  Card.addCardToJson(newCard);
  res.json(newCard);

});




module.exports = router;
