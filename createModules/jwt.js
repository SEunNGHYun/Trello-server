const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/secret_key');

module.exports = {
  makeToken: function (data) {
    const token = jwt.sign({
      id: data.id
    }, secretKey);
    return token;
  },
  verify: function (token) {
    console.log('토큰', token);
    return jwt.verify(token, secretKey);
  }
};