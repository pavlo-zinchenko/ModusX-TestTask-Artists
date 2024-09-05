const express = require('express');
const router = express.Router();
const ArtistController = require('../controllers/ArtistController');

router.get('/', ArtistController.getArtists);
router.get('/:artistId', ArtistController.getArtist);

module.exports = router;
