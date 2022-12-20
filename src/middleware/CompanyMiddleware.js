const Voter = require('../models/voter');
const Company = require('../models/company');

class CompanyMiddleware {


    // Kiểm tra tài khoản Company chưa tồn tại trước khi đăng kí
    registrationMiddleware(req, res, next) {
        Company.findOne({ email: req.body.email })
            .then( result => {
                if(!result) {
                    return next();
                }
                else {
                    res.json({
                        status: 'error', 
                        message: 'Account already exists!!!', 
                        data: null
                    })
                }
            })
            .catch(err => res.status(500).json({
                message: err.message
            }))
    }

    
    
}

module.exports = new CompanyMiddleware();