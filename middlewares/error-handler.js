const errorHandler = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Internal server ERROR!' });
}

module.exports = errorHandler;