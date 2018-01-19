const express = require('express');
const router = express.Router();
const u = require('../utility/utility');
const Data = require('../model/data');
const Category = require('../model/Category');

const dataDir = "data";
const dataFile = "data.json";

const defaultColours = [
  '#0E7C7B', //medblue
  '#00487C', //dblue
  '#B8B42D', //yellow
  '#D62246', //magenta
  '#37392E' //darkgray
];


router.get('/', (req, res, next) => {
  var dataContent = Data.getFileData(dataDir, dataFile)
  .then((data) => {

    var cards = data.cards;

    //console.log(JSON.stringify(cards));


    var cat = req.query.cat;
    //console.log(cat);
    if(cat) {
      cards = cards.filter((c) => {return c.categoryId == cat})
    }

    //console.log(JSON.stringify(cards));


    cards = Category.attachCategoriesToCards(cards, data.categories);

    var defaultColour = defaultColours[Math.floor((Math.random() * defaultColours.length))];



    res.render('library.pug', {
      cards: cards,
      categories: data.categories,
      categories: data.categories,
      templates: data.templates,
      defaultColour: defaultColour
    });
  })
  .catch((err) => {
    console.log(err);
  })
});


module.exports = router;
