//A template is an array of category ids with a name.

function Template(name, slots){
  this.name = name;
  this.slots = slots;
}

function newEmptyTemplate(name){
  return new Template(name, []);
}

module.exports = {
  Template,
  newEmptyTemplate
}
