const u = require('../utility/utility.js');
const Data = require('../model/data.js');

//Card data type
function Card(title, comments, categoryId){
  this.title = title;
  this.comments = comments;
  this.categoryId = categoryId;
}

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

module.exports = {
  Card,
  addCardToJson
}
