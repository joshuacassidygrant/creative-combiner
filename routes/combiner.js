const express = require('express');
const router = express.Router();
const u = require('../utility/utility');
const Data = require('../model/data');
const Category = require('../model/Category');
const Card = require('../model/Card');



router.get('/', (req, res, next) => {
  var dataContent = Data.getFileData()
  .then((data) => {

    var cards = data.cards;

    var cat = req.query.cat;
    if(cat) {
      cards = cards.filter((c) => {return c.categoryId == cat})
    }

    cards = Category.attachCategoriesToCards(cards, data.categories);


    var combination = combine(data.templates[0], cards)
    console.log(JSON.stringify(combination));

    res.render('combiner.pug', {
      cards: cards,
      categories: data.categories,
      templates: data.templates,
      combination: combination
    });
  })
  .catch((err) => {
    console.log(err);
  })
});

//REQUIRES: a full set of data and a chosen template
//EFFECTS: produces an array of cards randomly chosen within the given category sequence in the template
function combine(template, cards) {
  var combination = [];

  template.slots.forEach((s) => {
    var cardsOfCategory = u.getCardsOfCategory(cards, s);
    var card = cardsOfCategory[Math.floor((Math.random() * cards.length))];
    combination.push(card);
  });

  return combination;
}


module.exports = router;
