//UI


/*function addToListExclusive(){

}*/



var getCardsOfCategory = (cards, categoryId) => {
  var cardsInCategory = [];
  cards.forEach((c) => {
    if(c.category.id = categoryId) {
      cardsInCategory.push(c);
    }
  });
  console.log("Cards In Cat" + JSON.stringify(cardsInCategory));
  return cardsInCategory;
}


module.exports = {
  getCardsOfCategory
}
