const express = require('express');
const router = express.Router();
const Conversation = require('../db/queries/index');
const Utils = require('../lib/utils');

/* POST Create */
router.post('/', auth, async (req, res, next) => {
  const conversation = await Conversation.create();
});

/* POST Signup */
router.post('/signup', async (req, res, next) => {
  const { email, password, username } = req.body;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!email.match(emailRegex)) {
    return res.status(400).json({ error: 'Invalid email' }).send();
  } else if (!password.match(passRegex)) {
    return res.status(400).json({
      error:
        'Password must contain at least 8 characters, a capital letter, a number and a special character',
    });
  }

  const match = await Conversation.findByEmail(email);
  if (match) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const hash = await Utils.hashPassword(password);
  const user = await Conversation.create({ email, hash, username });
  const accessToken = Utils.issueJWT(user);
  return res.status(201).json(accessToken);
});

module.exports = router;
