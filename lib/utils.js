const bcrypt = require('bcrypt');

const jsonwebtoken = require('jsonwebtoken');
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
module.exports = {
  validPassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  },

  hashPassword: async (password) => {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  },

  issueJWT: (user) => {
    const expiresIn = 60 * 60 * 24 * 1000 * 30; // 60s * 60m * 24h * 1000ms = 1d * 30 = 30d
    const payload = {
      id: user.id,
      iat: Date.now(),
    };
    const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, {
      expiresIn,
    });
    return {
      accessToken: 'Bearer ' + signedToken,
      expires: expiresIn,
    };
  },

  verifyJWT: (token) => {
    return jsonwebtoken.verify(token, process.env.SECRET);
  },
};
