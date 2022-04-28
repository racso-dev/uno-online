const express = require('express');
const router = express.Router();
const db = require('../db');
const User = require('../db/users');

/* POST Signin. */
router.post('/signin', async (req, res, next) => {
  // Validate that the request contains a valid email with regex
  // Validate that the request contains a password that has at least one capital letter, one special character and one number with regex
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).json({
      error: 'Missing "email" and/or "password" field(s)',
    });
  }
  const match = await User.findByEmail(email);
  // Check if the user exists in the database
  // If the user exists, check if the password matches
  // If the password matches, return the user
  // If the password doesn't match, return an error
  // If the user doesn't exist, return an error

  return res
    .status(200)
    .json({
      email: email,
      password: password,
    })
    .send();
});

// /* POST Signup. */
router.post('/signup', async (req, res, next) => {
  // Validate that the request contains a valid email with regex
  // Validate that the request contains a password that has at least one capital letter, one special character and one number with regex
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return res.status(400).json({ error: 'Invalid email' }).send();
  }

  if (
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
  ) {
    return res
      .status(400)
      .json({
        error:
          'Password must contain at least 8 characters, a capital letter, a number and a special character',
      })
      .send();
  }

  // Check if the user exists in the database
  // If the user exists, return an error
  // If the user doesn't exist, hash password and insert the user into the database with raw sql query and return the user
  const match = await User.findByEmail(email);
  if (match) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const user = await User.create({ email, password, username });
  console.log('USer ==', user);
  return res.json(user);
});

module.exports = router;
