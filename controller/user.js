const crypto = require('crypto');
const { User } = require('../models/index');
const { makeToken } = require('../createModules/jwt');
// models에서 불러오기

User.sync();
module.exports = {
  signup: async (req, res) => {
    let { email, password, name } = req.body;
    password = crypto.createHash('sha1').update(password).digest('hex');
    return User.findOrCreate({
      where: { email: email },
      defaults: { email, password, name }
    }).spread((memo, created) => {
      console.log('created', created);
      if (created) {
        res.status(201);
        return res.json({ signup: true });
      }
      res.status(400);
      return res.json({ signup: false });
    });
  },
  login: async (req, res) => {
    let { email, password } = req.body;
    password = crypto.createHash('sha1').update(password).digest('hex');
    User.findOne({ where: { email } })
      .then(async result => {
        result = result.dataValues;
        if (result.password === password) {
          const token = await makeToken(result);
          res.status(204);
          console.log('token', token);
          res.cookie('user', token);
          return res.json({ token });
        }
      }).catch(result => {
        res.status(400);
        res.json({ sign: false });
      });
  }
};