const createError = require('../lib/error/errorFactory');

const validateParams = (schema) => async (req, res, next) => {
    let params = req.params;
    // console.log('Params::', params); //before
    try {
        params = await schema.validate(params, { abortEarly: false, stripUnknown: true });
        req.params = params;
        // console.log('Params::', params); //after
        next();
    } catch (err) {
        next(createError(err));
    }
};

const validateBody = (schema) => async (req, res, next) => {
    let body = req.body;
    // console.log('input::', body); //before
    try {
        //abortEarly: false : không dừng xác thực khi thấy giá trị không hợp lệ đầu tiên
        //stripUnknown: true : xóa những trường không được định nghĩa trong schema
        body = await schema.validate(body, { abortEarly: false, stripUnknown: true });
        req.body = body;
        // console.log('Body::', body); //after
        next();
    } catch (err) {
        next(createError(err));
    }
};

module.exports = { validateBody, validateParams };
