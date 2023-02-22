const ApplicationError = require('./applicationError');
const commonError = require('./commonError');
const yup = require('yup');

function mapYupValidationError(error) {
    return {
        type: ApplicationError.type.APP_NAME,
        code: 'VALIDATION_ERROR',
        message: error.message,
        statusCode: 400,
    };
}

function createError(error, overrides) {
    if (error instanceof yup.ValidationError) {
        const yupError = mapYupValidationError(error);
        if (process.env.NODE_ENV === 'development') return new ApplicationError(yupError, overrides);
        else return new ApplicationError(commonError.INTERNAL_SERVER_ERROR);
    }
    return new ApplicationError(error, overrides);
}

module.exports = createError;
