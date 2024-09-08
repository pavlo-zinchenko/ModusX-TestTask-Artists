const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validations/authValidation');

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/renew', jwtMiddleware, AuthController.renewToken);

module.exports = router;
