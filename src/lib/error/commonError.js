const ApplicationError = require('./applicationError');

const commonError = {
    // Application custom errors
    UNKNOWN_ERROR: {
        type: ApplicationError.type.APP_NAME,
        code: 'UNKNOWN_ERROR',
        message: 'Unknown error',
        statusCode: 500,
    },

    // Predefined 4xx http errors
    BAD_REQUEST: {
        type: ApplicationError.type.NETWORK,
        code: 'BAD_REQUEST',
        message: 'Bad request',
        statusCode: 400,
    },
    UNAUTHORIZED: {
        type: ApplicationError.type.NETWORK,
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
        statusCode: 401,
    },
    FORBIDDEN: {
        type: ApplicationError.type.NETWORK,
        code: 'FORBIDDEN',
        message: 'Forbidden',
        statusCode: 403,
    },
    RESOURCE_NOT_FOUND: {
        type: ApplicationError.type.NETWORK,
        code: 'RESOURCE_NOT_FOUND',
        message: 'Resource not found',
        statusCode: 404,
    },
    FAILED_EMAIL_SEND: {
        type: ApplicationError.type.NETWORK,
        code: 'FAILED_EMAIL_SEND',
        message: 'Failure Sending Mail',
        statusCode: 422,
    },

    //Predefined 5xx http errors
    INTERNAL_SERVER_ERROR: {
        type: ApplicationError.type.NETWORK,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal Server Error',
        statusCode: 500,
    },
    BAD_GATEWAY: {
        type: ApplicationError.type.NETWORK,
        code: 'BAD_GATEWAY',
        message: 'Bad Gateway',
        statusCode: 502,
    },
    SERVICE_UNAVAILABLE: {
        type: ApplicationError.type.NETWORK,
        code: 'SERVICE_UNAVAILABLE',
        message: 'Service Unavailable',
        statusCode: 503,
    },
    GATEWAY_TIMEOUT: {
        type: ApplicationError.type.NETWORK,
        code: 'GATEWAY_TIMEOUT',
        message: 'Gateway Timeout',
        statusCode: 504,
    },
};

module.exports = commonError;
