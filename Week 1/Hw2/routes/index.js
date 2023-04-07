var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  /* https://github.com/expressjs/express/issues/3498 */
  // res.render('myindex', { title: 'Express' });
  res.sendFile(path.join(__dirname, "../public/food-blog.html"));
});

module.exports = router;
