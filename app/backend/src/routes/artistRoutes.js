const express = require('express');
const router = express.Router();
const ArtistController = require('../controllers/ArtistController');

router.get('/', ArtistController.getArtists);
router.get('/:artistId', ArtistController.getArtist);
router.get('/:id/songs', ArtistController.getSongsByArtist);

module.exports = router;
