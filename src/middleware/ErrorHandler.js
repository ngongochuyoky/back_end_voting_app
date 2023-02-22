const { formatError } = require('../lib/response');
const ApplicationError = require('../lib/error/applicationError');
const commonError = require('../lib/error/commonError');

function notFound(req, res, next) {
    const newError = new ApplicationError(commonError.RESOURCE_NOT_FOUND);
    next(newError);
}

function errorHandler(err, req, res, next) {
    console.log('error:::', err.message)
    if (err instanceof ApplicationError) {
        const code = err.statusCode || 500;
        return res.status(code).json(formatError(err));
    }

    if (err instanceof Error) {
        const newError = new ApplicationError(commonError.INTERNAL_SERVER_ERROR);
        const code = newError.statusCode || 500;
        return res.status(code).json(formatError(newError));
    }
    
    const unknownError = new ApplicationError(commonError.UNKNOWN_ERROR);
    const code = unknownError.statusCode || 500;
    return res.status(code).json(formatError(unknownError));
}

module.exports = { notFound, errorHandler };
