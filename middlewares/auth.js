const Queries = require('../db/queries/index');
const Utils = require('../lib/utils');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log('TOKEN ===', token);
  try {
    const decoded = Utils.verifyJWT(token);
    console.log('DECODED ===', decoded);
    const ret = await Queries.Users.findById(decoded.id);
    console.log('ret ===', ret);
    req.user = await Queries.Users.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or missing accessToken' });
  }
};
