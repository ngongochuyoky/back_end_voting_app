const jwt = require('jsonwebtoken');
require('dotenv').config();

class Authentication {
    //Tạo mới Token
    generateAccessToken(data) {
        const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
        return token
    }

    //Xác thực Token
    authenticateToken(req, res, next) {
        const authHeader = req.headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token === null) res.status(401).json({
            message: 'Token is null'
        })
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) res.status(403).json({
                message: 'Invalid token'
            })
            req.id = decoded._id
            next()
          })
    }
}

module.exports = new Authentication