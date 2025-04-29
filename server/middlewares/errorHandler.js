const { errorParser } = require('../utils/errorParser');

const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = errorParser(err);
    res.status(statusCode).json({ message });
};

module.exports = errorHandler;