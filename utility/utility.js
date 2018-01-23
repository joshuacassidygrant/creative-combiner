//UI


/*function addToListExclusive(){

}*/



var getCardsOfCategory = (cards, categoryId) => {
  var cardsInCategory = [];
  cards.forEach((c) => {
    if(c.category.id == categoryId) {
      cardsInCategory.push(c);
    }
  });
  return cardsInCategory;
}


module.exports = {
  getCardsOfCategory
}
