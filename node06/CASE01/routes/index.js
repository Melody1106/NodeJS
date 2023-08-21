var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //移置expe.js
  // res.render('index', { title: 'Express' });
  res.redirect("/expe")
});

module.exports = router;
