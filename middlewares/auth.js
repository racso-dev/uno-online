const User = require('../db/users');
const Utils = require('../lib/utils');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = Utils.verifyJWT(token);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or missing accessToken' });
  }
};
