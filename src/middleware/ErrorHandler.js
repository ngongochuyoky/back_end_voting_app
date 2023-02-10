function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found');
    next(error);
}

function logErrors(err, req, res, next) {
    console.log('error:::', err.message);
    next(err);
}

function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode || 500
    res.status(statusCode).json({
        status: 'error',
        message: process.env.NODE_ENV === 'development' ? err.message : null,
        errors: err.errors
    });
}

module.exports = {notFound, logErrors, errorHandler}