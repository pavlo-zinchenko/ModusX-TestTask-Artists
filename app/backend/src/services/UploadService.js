const fs = require('fs');
const path = require('path');
const ApiError = require('../utils/ApiError');

class UploadService {
    async getSong(filename, res) {
        try {
            const filePath = path.join(__dirname, '../../uploads/songs', filename);

            if (!fs.existsSync(filePath)) {
                throw new ApiError(404, 'File not found');
            }

            res.sendFile(filePath);
        } catch (error) {
            console.error('Error getting song:', error.message);
            throw new ApiError(500, 'Unable to fetch song data');
        }
    }

    async getSongMetadata(filename, res) {
        try {
            const filePath = path.join(__dirname, '../../uploads/songs', filename);

            if (!fs.existsSync(filePath)) {
                throw new ApiError(404, 'File not found');
            }

            const stat = fs.statSync(filePath);
            const fileSize = stat.size;
            const fileExtension = path.extname(filename).toLowerCase();
            const allowedExtensions = ['.mp3', '.wav'];

            if (!allowedExtensions.includes(fileExtension)) {
                throw new ApiError(403, 'Forbidden file type');
            }

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

module.exports = new UploadService();
