const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/UploadController');
const path = require('path');

router.use('/avatars', express.static(path.join(__dirname, '../../uploads/avatars')));
router.use('/covers', express.static(path.join(__dirname, '../../uploads/covers')));
router.get('/songs/:filename', UploadController.getSong);

module.exports = router;
