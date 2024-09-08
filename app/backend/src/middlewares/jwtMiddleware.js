const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const jwtMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return next(new ApiError(403, 'Access denied. Unauthorized request.'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return next(new ApiError(401, 'Access denied. Unauthorized request.'));
    }
};

module.exports = jwtMiddleware;
