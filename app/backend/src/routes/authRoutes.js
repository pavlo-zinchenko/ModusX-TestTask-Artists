const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.post('/renew', jwtMiddleware, AuthController.renewToken);

module.exports = router;
