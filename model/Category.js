const u = require('../utility/utility.js');
const Data = require('../model/data.js');

function Category(id, name, colour){
  this.id = id;
  this.name = name;
  this.colour = colour;
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
      console.log("No category found with id " + cards[i].categoryId + " for card " + cards[i].title);
    }

  }
  return cards;
}

var attachCategoriesToTemplates = (templates, categories) => {
  templates.forEach((t)=>{
    t.slotsData = [];
    t.slots.forEach((s)=> {
      categories.forEach((c) => {
        if(c.id == s) {
          t.slotsData.push(c);
        }
      })
    })
  })
  return templates;
}



module.exports = {
  Category,
  attachCategoriesToCards,
  attachCategoriesToTemplates
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
