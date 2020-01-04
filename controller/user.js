const crypto = require('crypto');
const { User } = require('../models/index');
const { makeToken, verify } = require('../createModules/jwt');
// models에서 불러오기

User.sync();
module.exports = {
  usercheck: (req, res, next) => {
    const id = verify(req.cookies.user).id;
    return User.findOne({
      where: { id }
    })
      .then(data => {
        if(data.dataValues) {
          return next();
        }
      })
      .catch(err => {
        if(err) {
          res.status(400);
          return res.json({ check: false });
        }
      });
  },
  check: (req, res) => {
    if(req.cookie) {
      res.status(200);
      return res.json({ check: true });
    }else{
      res.status(203);
      return res.json({ check: false });
    }
  },  
  userInfo: (req, res) => {
    const id = verify(req.cookies.user).id;
    User.findOne({
      where: { id }
    })
      .then(result => {
        res.status(200);
        const { email, name } = result.dataValues; 
        console.log('sdd', email, name);
        console.log('pass');
        res.status(200);
        return res.json({
          userInfo: {
            email,
            name
          }
        });
      })
      .catch(err => {
        if(err) {
          res.status(400);
          return res.json({ userIfo: false });
        }
      });
  },
  signup: (req, res) => {
    let { email, password, name } = req.body.data;
    password = crypto.createHash('sha512').update(password).digest('base64'); 
    return User.findOrCreate({
      where: { email: email },
      defaults: { email, password, name }
    })
      .spread((memo, created) => {
        if (created) {
          res.status(201);
          return res.json({ signup: true });
        } 
      })
      .catch(err => {
        if(err) {
          res.status(400);
          return res.json({ signup: false });
        }
      });
  },
  login: (req, res) => {
    let { email, password } = req.body;
    console.log('req', req.body);
    password = crypto.createHash('sha512').update(password).digest('base64'); 
    User.findOne({ where: { email } })
      .then(async result => {
        result = result.dataValues;
        if (result.password === password) {
          const token = await makeToken(result);
          console.log('token', token);
          res.cookie('user', token, { maxAge: 365 * 24 * 60 * 60 * 100, httpOnly: true });
          return res.send({ token });
        }else{
          res.status(400);
          res.json({ sign: false });
        }
      })
      .catch(result => {
        res.status(400);
        res.json({ sign: false });
      });
  }, 
  logout: (req, res) => {
    const token = verify(req.cookies.user);
    if(token) {
      res.status(200);
      res.clearCookie('user');
      return res.send({ logout: true });
    }else{
      res.status(400);
      return res.send({ logout: false });
    }
  }, 
  edit: (req, res) => {
    const { password, email, name } = req.body;
    const id = verify(req.cookies.user).id;
    User.update(
      { password, email, name },
      { where: { id } }
    )
      .then(result => {
        console.log(result);
        res.status(200);
        return res.json({ edit: true });
      })
      .catch(err => {
        if(err) {
          res.status(400);
          return res.json({ edit: false });
        }
      });
  }
};