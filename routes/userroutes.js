const router = require('express').Router();
const controller = require('../controller/user');


router.post('/signup', controller.signup);
router.post('/logIn', controller.login);

module.exports = router;