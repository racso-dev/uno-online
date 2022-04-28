const express = require('express');
const router = express.Router();
const Utils = require('../lib/utils');
const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/:id', auth, async (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
