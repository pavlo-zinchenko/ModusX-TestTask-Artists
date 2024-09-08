const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const startTokenCleaner = require('./src/cron/tokenCleaner');
const errorHandler = require('./src/middlewares/errorHandler');

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

app.use('/auth', require('./src/routes/authRoutes'));
app.use('/user', require('./src/routes/userRoutes'));
app.use('/artists', require('./src/routes/artistRoutes'));
app.use('/favourite', require('./src/routes/favouriteRoutes'));
app.use('/downloads', require('./src/routes/downloadRoutes'));
app.use('/uploads', require('./src/routes/uploadRoutes'));
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use(errorHandler);

startTokenCleaner();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
