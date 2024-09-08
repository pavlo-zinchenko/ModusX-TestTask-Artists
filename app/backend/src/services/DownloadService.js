const fs = require('fs');
const path = require('path');
const ApiError = require('../utils/ApiError');
const ArtistService = require('./ArtistService');

class DownloadService {
    async DownloadSong(filename, artist_id, res) {
        try {
            const filePath = path.join(__dirname, '../../uploads/songs', filename);
            
            const fileExists = fs.existsSync(filePath);
            if (!fileExists) {
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
            
            return res.sendFile(filePath);
        } catch (error) {
            console.error('Error during file download:', error.message);
            throw new ApiError(500, 'Unable to download the song');
        }
    }
}

module.exports = new DownloadService();
