const Company = require('../models/company');
const Voter = require('../models/voter');
const authorization = require('../middleware/Authentication');
const bcrypt = require('bcrypt');
const sendMail = require('../utils/mailer');

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
                    email: company.email,
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
    //[POST] /voter/resultMail
    async resultMail(req, res, next) {
        console.log(req.body)
        try {
            const voters = await Voter.find({ election_address: req.body.electionAddress });
            for (const voter of voters) {
                const subject = `Thông báo kết quả cuộc bầu chọn ${req.body.electionName}`;
                const htmlContent = `<p style="color:green; font-size: 16px">Kết quả bầu chọn các ứng viên
                cho các vị trí </p > 
                        <p>
                            Tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
                        </p>
                        ${req.body.winners.map(
                            (winner, index) =>
                                `<div>
                                <p>Vị trí: <span style="font-weight: 600">${winner.positionName}</span></p> 
                                <p>Người chiến thắng: <span style="font-weight: 600">${winner.name}</span>
                                    Với số phiếu được bầu là: ${winner.voteCount}
                                </p>
                                <p>Thông tin liên hệ: <span style="font-weight: 600">${winner.email}</span></p>
                                <p>----------------------------------------------------------------</p>
                            </div>`,
                        )}
                        <p>
                            Đăng nhập tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
                        </p>`;
                try{
                    await sendMail(voter.email, subject, htmlContent);
                }catch(err){
                    console.log(err.message);
                }
            }
            for (const winner of req.body.winners) {
                const subject = `Thông báo kết quả cuộc bầu chọn ${req.body.electionName}`;
                const htmlContent = `<p style="color:green; font-size: 16px">Chúc mừng bạn đã được bầu làm: ${
                    winner.positionName
                }</p > 
                        <p>
                            Kết quả tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
                        </p>
                        ${req.body.winners.map(
                            (winner, index) =>
                                `<div>
                                <p>Vị trí: <span style="font-weight: 600">${winner.positionName}</span></p> 
                                <p>Người chiến thắng: <span style="font-weight: 600">${winner.name}</span>
                                    Với số phiếu được bầu là: ${winner.voteCount}
                                </p>
                                <p>Thông tin liên hệ: <span style="font-weight: 600">${winner.email}</span></p>
                                <p>----------------------------------------------------------------</p>
                            </div>`,
                        )}
                        <p>
                            Đăng nhập tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
                        </p>`;
                try{
                    await sendMail(winner.email, subject, htmlContent);
                }catch(err) {
                    console.log(err.message)
                }
            }
            res.json({
                data: 'Success',
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

module.exports = new CompanyController();
