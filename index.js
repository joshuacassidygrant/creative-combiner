//IMPORTS
const express = require('express');
const fs = require('fs');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');


//SETUP
const port = process.env.PORT || 3000;
var app = express();
app.set('view-engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Server is up on port ${3000}`);
});


//ROUTES
var index = require('./routes/home');
var addData = require('./routes/addData');
var addCategory = require('./routes/addCategory');
var addTemplate = require('./routes/addTemplate');
var addTemplateComponent = require('./routes/addTemplateComponent');
var library = require('./routes/library');
var templates = require('./routes/templates');

app.use('/', index);
app.use('/addData', addData);
app.use('/addCategory', addCategory);
app.use('/addTemplate', addTemplate);
app.use('/addTemplateComponent', addTemplateComponent);
app.use('/library', library);
app.use('/templates', templates);



module.exports = app;
