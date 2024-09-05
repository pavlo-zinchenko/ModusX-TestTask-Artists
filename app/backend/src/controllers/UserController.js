const UserService = require('../services/UserService');

class UserController {
    async getUser(req, res, next) {
        try {
            const user = await UserService.getUser(req.user.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await UserService.updateUser(req.user.id, req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
