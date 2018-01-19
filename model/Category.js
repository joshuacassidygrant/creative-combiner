const u = require('../utility/utility.js');
const Data = require('../model/data.js');

function Category(id, name, colour){
  this.id = id;
  this.name = name;
  this.colour = colour;
}

function addCategory(name, colour) {
  var data = Data.getFileData()
  .then((data) => {
    var nextId = 0;
    var found = false;


    for(let i = 0; i < data.categories.length; i++){
      if(data.categories[i].name === name){
        found = true;
      }
      nextId = Math.max(data.categories[i].id, nextId) + 1;
    }

    if(!found){
      var category = new Category(nextId, name, colour);
      data.categories.push(category);
      Data.saveFileData(data);
      return category;
    } else {
      console.log("Category with given name already found");
      return null;
    }
  })
  .catch((err) =>{
    console.log(err);
  })
}

var attachCategoriesToCards = (cards, categories) => {
  for(let i=0; i < cards.length; i++){
    found = false;
    j = 0;
    while(j < categories.length && found == false) {
      if(categories[j].id == cards[i].categoryId){
        cards[i].category = categories[j];
        found = true;
      }
      j++;
    }

    if(!found){
      console.log("No category found with id " + cards[i].categoryId );
    }

  }
  return cards;
}



module.exports = {
  addCategory,
  attachCategoriesToCards
}

/*function getCategories(data) {
  categories = [];
  data.categories.forEach((c)=>{
    var found = categories.some((d) => {
      return d.id === c.id;
    });

    if(!found){
      categories.push(c);
    }

  })
  console.log(categories);
  return categories;
}*/
