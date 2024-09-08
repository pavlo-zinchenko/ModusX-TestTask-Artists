const fs = require('fs');
const path = require('path');
const ApiError = require('../utils/ApiError');

class UploadService {
    async getSong(filename, res) {
        try {
            const filePath = path.join(__dirname, '../../uploads/songs', filename);

            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    throw new ApiError(404, 'File not found');
                }

                const fileExtension = path.extname(filename).toLowerCase();
                const allowedExtensions = ['.mp3', '.wav'];

                if (!allowedExtensions.includes(fileExtension)) {
                    throw new ApiError(403, 'Forbidden file type');
                }

                res.sendFile(filePath);
            });
        } catch (error) {
            console.error('Error getting song:', error.message);
            throw new ApiError(500, 'Unable to fetch song data');
        }
    }
}

module.exports = new UploadService();
