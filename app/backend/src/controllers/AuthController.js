const AuthService = require('../services/AuthService');

class AuthController {
    async register(req, res, next) {
        try {
            const { user, token } = await AuthService.register(req.body);
            res.json({ user, token });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { user, token } = await AuthService.login(req.body);
            res.json({ user, token });
        } catch (error) {
            next(error);
        }
    }

    async renewToken(req, res, next) {
        try {
            const token = await AuthService.renewToken(req.user);
            res.json({ token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
