const Company = require('../models/company');
const authorization = require('../middleware/Authentication');
const bcrypt = require('bcrypt');

class CompanyController {
    //[GET] /company/:id
    async show(req, res, next) {
        try {
            const company = await Company.findById(req.params.id);
            res.json({
                data: company,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    //Đăng nhập với tài khoản Company
    //[POST] /company/login
    async login(req, res, next) {
        try {
            const company = await Company.findOne({ email: req.body.email });
            if (!company) res.json({ message: 'Account does not exist!!!', data: null });
            else {
                if (bcrypt.compareSync(req.body.password, company.password) && req.body.email === company.email) {
                    res.json({
                        data: {
                            email: company.email,
                            id: company._id,
                            token: authorization.generateAccessToken({
                                _id: company._id,
                            }),
                        },
                    });
                } else res.json({ message: 'Invalid email/password!!!', data: null });
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    // Đăng kí tài khoản Company
    //[POST] /company/register
    async register(req, res, next) {
        try {
            const company = await Company.create({
                email: req.body.email,
                password: req.body.password,
                company_name: req.body.companyName,
            });
            res.json({
                data: {
                    company_email: company.email,
                    id: company._id,
                    token: authorization.generateAccessToken({
                        _id: company._id,
                    }),
                },
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

module.exports = new CompanyController();
