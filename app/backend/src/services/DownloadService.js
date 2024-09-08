const fs = require('fs');
const path = require('path');
const ArtistService = require('./ArtistService');
const ChunkingService = require('./ChunkingService');
const ApiError = require('../utils/ApiError');

class DownloadService {
    async DownloadSong(filename, artist_id, req, res) {
        try {
            const filePath = path.join(__dirname, '../../uploads/songs', filename);

            if (!fs.existsSync(filePath)) {
                throw new ApiError(404, 'File not found');
            }

            const fileExtension = path.extname(filename).toLowerCase();
            const allowedExtensions = ['.mp3'];

            if (!allowedExtensions.includes(fileExtension)) {
                throw new ApiError(403, 'Forbidden file type');
            }

            const artist = await ArtistService.getArtist(artist_id);
            if (!artist) {
                throw new ApiError(404, 'Artist not found');
            }

            const encodedFilename = encodeURIComponent(`${artist.name} - ${filename}`);

            res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFilename}`);
            res.setHeader('Content-Type', 'audio/mpeg');

            ChunkingService.sendFileInChunks(filePath, req, res);
        } catch (error) {
            console.error('Error during file download:', error.message);
            throw new ApiError(500, 'Unable to download the song');
        }
    }

    async DownloadSongMetadata(filename, artist_id, res) {
        try {
            const filePath = path.join(__dirname, '../../uploads/songs', filename);

            if (!fs.existsSync(filePath)) {
                throw new ApiError(404, 'File not found');
            }

            const fileExtension = path.extname(filename).toLowerCase();
            const allowedExtensions = ['.mp3'];

            if (!allowedExtensions.includes(fileExtension)) {
                throw new ApiError(403, 'Forbidden file type');
            }

            const artist = await ArtistService.getArtist(artist_id);
            if (!artist) {
                throw new ApiError(404, 'Artist not found');
            }

            const stat = fs.statSync(filePath);
            const fileSize = stat.size;

            const encodedFilename = encodeURIComponent(`${artist.name} - ${filename}`);
            res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFilename}`);
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Length', fileSize);
            res.setHeader('Accept-Ranges', 'bytes');

            res.status(200).end();
        } catch (error) {
            console.error('Error getting song metadata:', error.message);
            throw new ApiError(500, 'Unable to fetch song metadata');
        }
    }
}

module.exports = new DownloadService();
