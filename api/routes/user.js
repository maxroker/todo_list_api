const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users_controller');



router.post('/register', UsersController.users_register);

router.post('/login', UsersController.users_login);

router.get('/me', checkAuth, UsersController.users_me);

router.delete('/:userId', checkAuth, UsersController.users_delete);


module.exports = router;