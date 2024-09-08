const express = require('express');
const router = express.Router();
const DownloadController = require('../controllers/DownloadController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/songs/:filename', jwtMiddleware, DownloadController.DownloadSong);

module.exports = router;
