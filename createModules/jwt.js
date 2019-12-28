const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/secret_key');

module.exports = {
  makeToken: function (data) {
    const token = jwt.sign({
      id: data.id
    }, secretKey);
    return token;
  }
};