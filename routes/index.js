var express = require('express');
var router = express.Router();
const db = require('../db');
const auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Insert books
router.post('/books', (req, res, next) => {
  const query = `INSERT INTO books (quotations) VALUES ('${req.body.title}', '${req.body.author}', '${req.body.isbn}')`;
});

router.get('/lobby', function (req, res, next) {
  res.render('lobby', { title: 'Express' });
});

router.get('/prompt', function (req, res, next) {
  res.render('prompt', { title: 'Express' });
});

router.get('/creategame', function (req, res, next) {
  res.render('creategame', { title: 'Express' });
});

router.get('/gamelist', function (req, res, next) {
  res.render('gamelist', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  console.log('JE PASSSESESEESESEE');
  res.render('login', { title: 'Express' });
});

router.post('/sendmessage', auth, async (req, res, next) => {
  const io = req.app.get('socketio');
  io.emit('chat_message', {username: req.user.username, body: req.body.message});
})

module.exports = router;
