const router = require('express').Router();
const controller = require('../controller/board');


router.get('/', controller.get);
router.post('/create', controller.create);
router.delete('/delete/:id', controller.delete);
router.put('/edit/:id', controller.edit);

module.exports = router;