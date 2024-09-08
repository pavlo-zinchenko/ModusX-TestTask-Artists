const fs = require('fs');

const TWO_MB = 2 * 1024 * 1024;

class ChunkingService {
    static sendFileInChunks(filePath, req, res) {
        try {
            const stat = fs.statSync(filePath);
            const fileSize = stat.size;
            const range = req.headers.range;

            if (!range) {
                res.setHeader('Content-Length', fileSize);
                const readStream = fs.createReadStream(filePath);
                readStream.pipe(res);
                return;
            }

            const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
            let start = parseInt(startStr, 10);
            let end = endStr ? parseInt(endStr, 10) : Math.min(start + TWO_MB - 1, fileSize - 1);

            if (start >= fileSize || end >= fileSize) {
                res.status(416).setHeader('Content-Range', `bytes */${fileSize}`);
                return res.end();
            }

            end = Math.min(start + TWO_MB - 1, fileSize - 1);

            const chunkSize = end - start + 1;

            res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
            res.setHeader('Content-Length', chunkSize);
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Type', 'audio/mpeg');
            res.status(206);

            const readStream = fs.createReadStream(filePath, { start, end });
            readStream.pipe(res);
        } catch (error) {
            console.error('Error in ChunkingService:', error.message);
            res.status(500).send('Error in serving file chunks.');
        }
    }
}

module.exports = ChunkingService;
