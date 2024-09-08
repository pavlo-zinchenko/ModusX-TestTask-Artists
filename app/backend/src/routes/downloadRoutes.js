const express = require('express');
const router = express.Router();
const DownloadController = require('../controllers/DownloadController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.head('/songs/:filename', jwtMiddleware, DownloadController.DownloadSongMetadata);
router.get('/songs/:filename', jwtMiddleware, DownloadController.DownloadSong);

module.exports = router;
