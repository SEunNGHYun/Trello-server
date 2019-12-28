const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/secret_key');
const controller = require('../controller/board');

// router.use('/*', function (req, res, next) {
//     try {
//         jwt.verify(, secretKey)
//         next();
//     } catch{
//         return res.json({ user: false })
//     }
// })
router.get('/', controller.get);
router.post('/add', controller.add);
router.delete('/delete', controller.delete);
router.put('/edit', controller.edit);

module.exports = router;