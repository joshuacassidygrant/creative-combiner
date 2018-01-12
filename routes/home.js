const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render("index.pug", {slorp: "scoop zop bzam"});

});



module.exports = router;
