const jwt = require('jsonwebtoken');
const createError = require('../lib/error/errorFactory');
const commonError = require('../lib/error/commonError');
require('dotenv').config();

class Authentication {
    //Tạo mới Token
    generateAccessToken(data) {
        const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
        return token;
    }

    //Xác thực Token
    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw createError(commonError.UNAUTHORIZED, { message: 'Invalid token'});
            }
            else next();
        });
    }
}

module.exports = new Authentication();
