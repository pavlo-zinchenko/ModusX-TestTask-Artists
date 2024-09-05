const FavouriteService = require('../services/FavouriteService');

class FavouriteController {
    async getFavourites(req, res, next) {
        try {
            const favourites = await FavouriteService.getFavourites(req.user.id);
            res.json(favourites);
        } catch (error) {
            next(error);
        }
    }

    async addFavourite(req, res, next) {
        try {
            const user = await FavouriteService.addFavourite(req.user.id, req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async removeFavourite(req, res, next) {
        try {
            const user = await FavouriteService.removeFavourite(req.user.id, req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FavouriteController();
