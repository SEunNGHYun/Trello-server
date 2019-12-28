const router = require('express').Router();
const controller = require('../controller/card');


router.get('/', controller.get);
router.post('/add', controller.add);
router.delete('/delete', controller.delete);
router.put('/edit', controller.edit);

module.exports = router;