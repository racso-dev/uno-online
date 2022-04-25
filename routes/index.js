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

router.get('/creategame', function(req, res, next) {
  res.render('creategame', { title: 'Express' });
});

router.get('/joingame', function(req, res, next) {
  res.render('joingame', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
 res.render('login', { title: 'Express' });
});

module.exports = router;
