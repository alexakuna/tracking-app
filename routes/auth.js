var express = require('express');
var router = express.Router();
var controller = require('../controllers/auth')

router.post('/login', controller.login)
router.post('/logout', controller.logout)
//router.post('/register', controller.register)
module.exports = router;
