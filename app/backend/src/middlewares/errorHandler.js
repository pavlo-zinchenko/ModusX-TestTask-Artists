const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode,
        });
    }

    console.error('Unexpected error:', err);
    return res.status(500).json({
        message: 'An unexpected error occurred',
        statusCode: 500,
    });
};

module.exports = errorHandler;
