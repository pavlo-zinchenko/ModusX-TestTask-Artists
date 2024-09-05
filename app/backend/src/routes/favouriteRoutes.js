const express = require('express');
const router = express.Router();
const FavouriteController = require('../controllers/FavouriteController');

router.get('/', FavouriteController.getFavourites);
router.post('/', FavouriteController.addFavourite);
router.delete('/:id', FavouriteController.removeFavourite);

module.exports = router;
