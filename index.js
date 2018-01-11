const express = require('express');
const port = process.env.PORT || 3000;

var app = express();
var pug = require('pug');

app.set('view-engine', 'pug');

app.get('/', (req, res) => {
  res.render("index.pug", {slorp: "scoop zop bzam"});
});


app.listen(port, () => {
  console.log(`Server is up on port ${3000}`);
});
