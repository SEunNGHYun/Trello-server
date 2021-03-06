const { board } = require('../models/index');
const { verify } = require('../createModules/jwt');

board.sync();


module.exports = {
  get: (req, res) => {
    const userId = verify(req.cookies.user).id;
    return board.findAll({
      where: { userId }
    })
      .then(data => {
        console.log(data[0].dataValues.User);
        const result = [];
        if(data.length > 0) {
          res.status(200);
          for(let i = 0; i < data.length; i++) {
            result.push(data[i].dataValues);
          }
          return res.json({ getBoard: result });
        }else{
          res.status(204);
          return res.json({ getBoard: result });
        }
      })
      .catch(err => {
        console.log('err', err);
        res.status(400);
        return res.json({ gatBoard: false });
      });
  },
  create: (req, res) => {
    const { title } = req.body;
    const userId = verify(req.cookies.user).id;
    board.create({
      title,
      userId
    })
      .then(data => {
        if(data.dataValues) {
          res.status(204);
          return res.json({ create: true });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        return res.json({ create: false });
      });
  },
  delete: (req, res) => {
    const boardId = req.params.id;
    console.log('id', boardId);
    board.destroy({
      where: {
        id: boardId
      }
    }).then(data => {
      console.log('data', data);
      res.status(204);
      return res.json({ delete: true });
    }).catch(err => {
      console.log('deleteERR', err);
      res.status(400);
      return res.json({ delete: false });
    });
  },
  edit: async (req, res) => {
    const boardId = req.params.id;
    const { title } = req.body;
    board.update(title, {
      where: { id: boardId }
    })
      .then(data => {
        console.log(data);
        res.status(204);
        return res.json({ edit: true });
      })
      .catch(err => {
        console.log('update', err);
        res.status(400);
        return res.json({
          edit: false
        });
      });
  },
  list: (req, res) => {
    const userId = verify(req.cookies.user).id;
    board.findAll({
      where: { userId },
      attributes: ['id', 'title']
    }).then(data => {
      const result = [];
      if(data.length > 0) {
        for(let i = 0; i < data.length; i++) {
          result.push(data[i].dataValues);
        }
        res.status(201);
        return res.json({ list: result });
      }
      res.status(200);
      return res.json({ list: result });
    })
      .catch(err => {
        console.log(err);
        res.status(400);
        return res.json({ list: false });
      });
  } 
};