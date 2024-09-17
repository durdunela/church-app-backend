const router = require('express').Router();
const UserController = require('../controller/user.controller');

router.post('/registration', UserController.register);
router.post('/signin', UserController.login);

module.exports = router;