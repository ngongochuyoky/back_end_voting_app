const Company = require('../models/company');
const authorization = require('../middleware/Authentication');
const bcrypt = require('bcrypt');

class CompanyController {
    //Đăng nhập với tài khoản Company
    login(req, res, next) {
        Company.findOne({
            email: req.body.email,
        })
            .then((company) => {
                if (company) {
                    if (bcrypt.compareSync(req.body.password, company.password) && req.body.email === company.email) {
                        res.json({
                            status: 'success',
                            message: 'company found',
                            data: {
                                email: company.email,
                                token: authorization.generateAccessToken({
                                    _id: company._id,
                                }),
                            },
                        });
                    } else {
                        res.json({ status: 'error', message: 'Invalid email/password!!!', data: null });
                    }
                } else {
                    res.json({ status: 'error', message: 'Account does not exist!!!', data: null });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    }

    // Đăng kí tài khoản Company
    register(req, res, next) {
        console.log(req.body.company_name);
        Company.create({
            email: req.body.email,
            password: req.body.password,
            company_name: req.body.companyName,
        })
            .then((company) => {
                res.json({
                    status: 'success',
                    message: 'Account created successfully',
                    data: {
                        company_email: company.email,
                        token: authorization.generateAccessToken({
                            _id: company._id,
                        }),
                    },
                });
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    }
}

module.exports = new CompanyController();
