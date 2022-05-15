const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const Utils = require('../lib/utils');

/* POST Signin */
router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: 'Missing "email" and/or "password" field(s)',
    });
  }
  const user = await queries.Users.findByEmail(email);
  const validPassword = await Utils.validPassword(password, user.password);
  if (!user || !validPassword) {
    res.status(401).json({
      error: 'Invalid email or password',
    });
  }
  const token = Utils.issueJWT(user);
  return res.status(200).json(token);
});

/* POST Signup */
router.post('/signup', async (req, res, next) => {
  const { email, password, username } = req.body;
  // console.log(req.body)
  console.log('REQUEST SINGUP');
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!email || !password || !username) {
    res.status(400).json({
      error: 'Missing "email", "password" and/or "username" field(s)',
    });
  }
  if (!email.match(emailRegex)) {
    return res.status(400).json({ error: 'Invalid email' }).send();
  } else if (!password.match(passRegex)) {
    return res.status(400).json({
      error:
        'Password must contain at least 8 characters, a capital letter, a number and a special character',
    });
  }

  const match = await queries.Users.findByEmail(email);
  if (match) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const hash = await Utils.hashPassword(password);
  const user = await queries.Users.create({ email, hash, username });
  const accessToken = Utils.issueJWT(user);
  // return res.redirect('/gamelist');
  return res.status(201).json(accessToken);
});

module.exports = router;
