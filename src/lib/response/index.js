
function formatError(error, overrides = {}) {
    const newError = JSON.parse(JSON.stringify(error));
    newError.statusCode = undefined;
    return {
        error: {
            ...newError,
        },
        status: 'error',
        ...overrides,
    };
}

function formatSuccess(result, overrides = {}) {
    return {
        data: result,
        status: 'success',
        ...overrides,
    };
}

module.exports = { formatError, formatSuccess };
