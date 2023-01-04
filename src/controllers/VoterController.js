const Voter = require('../models/voter');
const authorization = require('../middleware/Authentication');
const bcrypt = require('bcrypt');
const sendMail = require('../utils/mailer');
const saltRounds = 10;
require('dotenv').config();

class VoterController {
    //[GET] /voter/allVoter
    async index(req, res, next) {
        try {
            const voters = await Voter.find({election_address: req.params.electionAddress});
            res.json({ data: voters });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //[GET] /voter/:id
    async show(req, res, next) {
        try {
            const voter = await Voter.findOne({ _id: req.params.id });
            res.json({ data: voter });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //[GET] /voter/:electionAddress/trash
    async trash(req, res, next) {
        try {
            const voters = await Voter.findDeleted({election_address: req.params.electionAddress});
            res.json({ data: voters });
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    //[GET] /voter/:electionAddress/totalVoters
    async totalVoters(req, res, next) {
        try{
            const votersCount = await Voter.countDocuments({election_address: req.params.electionAddress});
            res.json({data: votersCount})
        }catch (err){
            res.status(500).json(err.message);
        }
    }

    //[PATCH] /voter/:id/restore
    async restore(req, res, next) {
        try {
            const result = await Voter.restore({ _id: req.params.id });
            res.json({ data: result });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //[POST] /voter/login
    //Login for voter
    async login(req, res, next) {
        try {
            const voter = await Voter.findOne({ email: req.body.email });
            if (voter) {
                bcrypt.compareSync(req.body.password, voter.password) && req.body.email === voter.email
                    ? res.json({
                          data: {
                              email: voter.email,
                              electionAddress: voter.election_address,
                              id: voter._id,
                              token: authorization.generateAccessToken({ _id: voter._id }),
                          },
                      })
                    : res.json({ message: 'Invalid email/password!!!', data: null });
            } else res.json({ message: 'Voter account does not exist!!!', data: null });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //Tạo mới tài khoản Voter dành cho Company
    //[POST] /voter/create
    async create(req, res, next) {
        try {
            //Create a new voter account - email unique
            var password = Math.random().toString(36).slice(-8);
            const voter = await Voter.create({
                email: req.body.email,
                password: password,
                full_name: req.body.fullName,
                election_address: req.body.electionAddress,
            });
            res.json({ data: voter });
            //send email
            const subject = `Thông báo đăng kí Người bỏ phiếu tại ${req.body.electionName}`;
            const htmlContent = `<p style="color:green; font-size: 16px">Chúc mừng bạn được đăng kí là 
                        Người bỏ phiếu </p > 
                            <p>
                                Tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
                            </p>
                            <p>Tài khoản đăng nhập của bạn là:</p>
                            <p>Username: <span style="font-weight: 600">${req.body.email}</span></p>
                            <p>Password: <span style="font-weight: 600">${password}</span></p>
                            <p>
                                Đăng nhập tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
                            </p>`;

            try {
                await sendMail(req.body.email, subject, htmlContent);
            } catch (err) {
                console.log(err.message);
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    // [PUT] /voter/:id
    async update(req, res, next) {
        try {
            const password = bcrypt.hashSync(req.body.password, saltRounds);
            const voter = await Voter.findByIdAndUpdate(
                req.params.id,
                {
                    full_name: req.body.fullName,
                    password: password,
                },
                { new: true },
            );

            res.json({ data: voter });
            //send Email
            const subject = `Thông báo Cập nhập tài khoản Người bỏ phiếu tại ${req.body.electionName}`;
            const htmlContent = `<p style="color:green; font-size: 16px">Cập nhập thành công tài khoản 
                        Người bỏ phiếu </p > 
                            <p>
                                Tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
                            </p>
                            <p>Tài khoản đăng nhập của bạn là:</p>
                            <p>Username: <span style="font-weight: 600">${voter.email}</span></p>
                            <p>Password: <span style="font-weight: 600">${req.body.password}</span></p>
                            <p>
                                Đăng nhập tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
                            </p>`;
            try {
                await sendMail(req.body.email, subject, htmlContent);
            } catch (err) {
                console.log(err.message);
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //[DELETE] /voter/:id
    async delete(req, res, next) {
        try {
            const result = await Voter.deleteById(req.params.id); //soft delete
            res.json({ data: result });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    
}

module.exports = new VoterController();
