const FavouriteService = require('../services/FavouriteService');

class FavouriteController {
    async getFavourites(req, res, next) {
        try {
            const user_id = req.user.id;
            const favourites = await FavouriteService.getFavourites(user_id);
            res.json(favourites);
        } catch (error) {
            next(error);
        }
    }

    async getFavouritesPagination(req, res, next) {
        try {
            const { ids } = req.body;
            const favourites = await FavouriteService.getFavouritesPagination(ids);
            res.json(favourites);
        } catch (error) {
            next(error);
        }
    }

    async addFavourite(req, res, next) {
        try {
            const user_id = req.user.id;
            const { song_id } = req.body;
            const user = await FavouriteService.addFavourite(user_id, song_id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async removeFavourite(req, res, next) {
        try {
            const user_id = req.user.id;
            const { song_id } = req.body;
            const user = await FavouriteService.removeFavourite(user_id, song_id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FavouriteController();
