const DownloadService = require('../services/DownloadService');

class DownloadController {
    async DownloadSong(req, res, next) {
        try {
            const { filename } = req.params;
            const { artist_id } = req.query;
            await DownloadService.DownloadSong(filename, artist_id, req, res);
        } catch (error) {
            next(error);
        }
    }

    async DownloadSongMetadata(req, res, next) {
        try {
            const { filename } = req.params;
            const { artist_id } = req.query;
            await DownloadService.DownloadSongMetadata(filename, artist_id, res);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DownloadController();
