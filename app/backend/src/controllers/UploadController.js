const UploadService = require('../services/UploadService');

class UploadController {
    async getSong(req, res, next) {
        try {
            const { filename } = req.params;
            await UploadService.getSong(filename, res);
        } catch (error) {
            next(error);
        }
    }

    async getSongMetadata(req, res, next) {
        try {
            const { filename } = req.params;
            await UploadService.getSongMetadata(filename, res);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UploadController();
