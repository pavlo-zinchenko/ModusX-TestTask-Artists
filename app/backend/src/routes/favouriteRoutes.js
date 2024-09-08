const express = require('express');
const router = express.Router();
const FavouriteController = require('../controllers/FavouriteController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/', jwtMiddleware, FavouriteController.getFavourites);
router.post('/', jwtMiddleware, FavouriteController.addFavourite);
router.delete('/', jwtMiddleware, FavouriteController.removeFavourite);

module.exports = router;
