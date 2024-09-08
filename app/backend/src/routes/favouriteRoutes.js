const express = require('express');
const router = express.Router();
const FavouriteController = require('../controllers/FavouriteController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/', jwtMiddleware, FavouriteController.getFavourites);
router.post('/:id', jwtMiddleware, FavouriteController.addFavourite);
router.delete('/:id', jwtMiddleware, FavouriteController.removeFavourite);

module.exports = router;
