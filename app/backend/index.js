const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const startTokenCleaner = require('./src/cron/tokenCleaner');
const errorHandler = require('./src/middlewares/errorHandler');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const artistRoutes = require('./src/routes/artistRoutes');
const favouriteRoutes = require('./src/routes/favouriteRoutes');

const ArtistService = require('./src/services/ArtistService');
const jwtMiddleware = require('./src/middlewares/jwtMiddleware');

dotenv.config();

const PORT = process.env.PORT || 3031;

const allowedOrigins = [process.env.FRONTEND_URL];
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
const allowedHeaders = ['Content-Type', 'Accept', 'Authorization'];

app.use(cors({
    origin: allowedOrigins,
    methods: allowedMethods,
    allowedHeaders: allowedHeaders,
}));

app.options('*', cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));
app.use('/uploads/covers', express.static(path.join(__dirname, 'uploads/covers')));

app.get('/uploads/songs/:filename', (req, res, next) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', 'songs', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }

        const fileExtension = path.extname(filename).toLowerCase();
        const allowedExtensions = ['.mp3', '.wav'];

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(403).json({ error: 'Forbidden file type' });
        }

        res.sendFile(filePath);
    });
});

app.get('/downloads/songs/:filename', jwtMiddleware, async (req, res, next) => {
    const { filename } = req.params;
    const { artist_id } = req.query;
    const filePath = path.join(__dirname, 'uploads', 'songs', filename);

    fs.access(filePath, fs.constants.F_OK, async (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }

        const fileExtension = path.extname(filename).toLowerCase();
        const allowedExtensions = ['.mp3'];

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(403).json({ error: 'Forbidden file type' });
        }

        try {
            const artist = await ArtistService.getArtist(artist_id);

            if (!artist) {
                return res.status(404).json({ error: 'Artist not found' });
            }

            const encodedFilename = encodeURIComponent(`${artist.name} - ${filename}`);

            res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFilename}`);
            res.setHeader('Content-Type', 'audio/mpeg');

            res.sendFile(filePath);
        } catch (err) {
            console.error('Error fetching artist or sending file:', err);
            next(err);
        }
    });
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/artists', artistRoutes);
app.use('/favourite', favouriteRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use(errorHandler);

startTokenCleaner();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
