//A template is an array of category ids with a name.

function Template(name, slots){
  this.name = name;
  this.slots = slots;
}

function newEmptyTemplate(name){
  return new Template(name, []);
}

function getActiveTemplate(data){
  var activeTemplateName = data.activeTemplate;
  var template;
  data.templates.forEach((t) => {
    if (t.name == activeTemplateName) {
      template = t;
    }
  })

  if(template != null){
    return template;
  } else {
    console.log(activeTemplateName + "not found");
    return null;
  }

}

module.exports = {
  Template,
  newEmptyTemplate,
  getActiveTemplate
}
