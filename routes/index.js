var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/lobby', function(req, res, next) {
  res.render('lobby', { title: 'Express' });
});

router.get('/prompt', function(req, res, next) {
  res.render('prompt', { title: 'Express' });
});

// router.get('/signup', function(req, res, next) {
//   res.render('signup', { title: 'Express' });
// });

// router.get('/signin', function(req, res, next) {
//  res.render('signin', { title: 'Express' });
// });

module.exports = router;
