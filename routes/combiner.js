const express = require('express');
const router = express.Router();
const u = require('../utility/utility');
const Data = require('../model/data');
const Category = require('../model/Category');
const Card = require('../model/Card');
const Template = require('../model/Template');



router.get('/', (req, res, next) => {
  var dataContent = Data.getFileData()
  .then((data) => {

    var cards = data.cards;

    var cat = req.query.cat;
    if(cat) {
      cards = cards.filter((c) => {return c.categoryId == cat})
    }

    var activeTemplate = Template.getActiveTemplate(data);
    //TODO: handle no template chosen or empty template
    cards = Category.attachCategoriesToCards(cards, data.categories);
    var combination = combine(activeTemplate, cards)

    res.render('combiner.pug', {
      cards: cards,
      categories: data.categories,
      templates: data.templates,
      combination: combination,
      activeTemplate: activeTemplate
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
    //console.log("Cards from " + s + JSON.stringify(cardsOfCategory));
    var card = cardsOfCategory[Math.floor((Math.random() * cardsOfCategory.length))];
    combination.push(card);
  });

  return combination;
}


module.exports = router;
