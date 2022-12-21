const Voter = require('../models/voter');
const authorization = require('../middleware/Authentication');
const bcrypt = require('bcrypt');
const sendMail = require('../utils/mailer');
const saltRounds = 10;
require('dotenv').config();

class VoterController {
    async index(req, res, next) {
        try {
            const voters = await Voter.find();
            res.json({
                status: 'success',
                data: voters,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //Function for voter
    async login(req, res, next) {
        try {
            const voter = await Voter.findOne({ email: req.body.email });
            if (voter) {
                (bcrypt.compareSync( req.body.password, voter.password) && req.body.email === voter.email)
                    ? res.json({
                          status: 'success',
                          message: 'Voter found',
                          data: {
                              email: voter.email,
                              token: authorization.generateAccessToken({ _id: voter._id }),
                          },
                      })
                    : res.json({ status: 'error', message: 'Invalid email/password!!!', data: null });
            } else res.json({ status: 'error', message: 'Voter account does not exist!!!', data: null });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //Tạo mới tài khoản Voter dành cho Company
    async create(req, res, next) {
        try {
            const result = await Voter.findOne({ email: req.body.email });
            if (!result) {
                //Create a new voter account

                const voter = await Voter.create({
                    email: req.body.email,
                    password: req.body.password,
                    full_name: req.body.fullName,
                    election_address: req.body.electionAddress,
                });

                res.json({
                    status: 'success',
                    message: 'Voter account created successfully',
                    data: voter,
                });
                //send email
                const subject = `Thông báo đăng kí Người bỏ phiếu tại ${req.body.electionName}`;
                const htmlContent = `<p style="color:green; font-size: 16px">Chúc mừng bạn được đăng kí là 
                        Người bỏ phiếu </p > 
                            <p>
                                Tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
                            </p>
                            <p>Tài khoản đăng nhập của bạn là:</p>
                            <p>Username: <span style="font-weight: 600">${req.body.email}</span></p>
                            <p>Password: <span style="font-weight: 600">${req.body.password}</span></p>
                            <p>
                                Đăng nhập tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
                            </p>`;

                await sendMail(req.body.email, subject, htmlContent);
            } else {
                res.json({
                    status: 'error',
                    message: 'Voter account already exists!!!',
                    data: null,
                });
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    async updateVoter(req, res, next) {
        try {
            const password = bcrypt.hashSync(req.body.password, saltRounds);
            const voter = await Voter.findOneAndUpdate(
                { email: req.body.email },
                {
                    full_name: req.body.fullName,
                    password: password,
                    updated: Date.now(),
                },
                { new: true },
            );

            if (voter) {
                res.json({
                    status: 'success',
                    message: 'Voter account updated successfully',
                    data: voter,
                });
                //send Email
                const subject = `Thông báo Cập nhập tài khoản Người bỏ phiếu tại ${req.body.electionName}`;
                const htmlContent = `<p style="color:green; font-size: 16px">Cập nhập thành công tài khoản 
                    Người bỏ phiếu </p > 
                        <p>
                            Tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
                        </p>
                        <p>Tài khoản đăng nhập của bạn là:</p>
                        <p>Username: <span style="font-weight: 600">${req.body.email}</span></p>
                        <p>Password: <span style="font-weight: 600">${req.body.password}</span></p>
                        <p>
                            Đăng nhập tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
                        </p>`;
                await sendMail(req.body.email, subject, htmlContent);
            } else
                res.json({
                    status: 'error',
                    message: ' Voter account does not exist!!!',
                    data: null,
                });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    async removeVoter(req, res, next) {
        try {
            const voter = await Voter.findOneAndDelete({ email: req.body.email });
            voter
                ? res.json({ status: 'success', message: 'Deleted successfully', data: null })
                : res.json({ status: 'error', message: 'Voter account does not exist', data: null });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    async resultMail(req, res, next) {
        try{
            const voters = await Voter.find({ election_address: req.body.electionAddress});
            for(const voter of voters) {
                const subject = `Thông báo kết quả cuộc bầu chọn ${req.body.electionName}`;
                const htmlContent = `<p style="color:green; font-size: 16px">Kết quả bầu chọn các ứng viên
                cho các vị trí </p > 
                        <p>
                            Tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
                        </p>
                        ${req.body.winners.map((winner, index) =>
                            `<div>
                                <p>Vị trí: <span style="font-weight: 600">${winner.positionName}</span></p> 
                                <p>Người chiến thắng: <span style="font-weight: 600">${winner.candidateName}</span>
                                    Với số phiếu được bầu là: ${winner.voteCount}
                                </p>
                                <p>Thông tin liên hệ: <span style="font-weight: 600">${winner.email}</span></p>
                                <p>----------------------------------------------------------------</p>
                            </div>` )

                        }
                        <p>
                            Đăng nhập tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
                        </p>`;
                await sendMail(voter.email, subject, htmlContent);
            }
            for(const winner of req.body.winners) {
                const subject = `Thông báo kết quả cuộc bầu chọn ${req.body.electionName}`;
                const htmlContent = `<p style="color:green; font-size: 16px">Chúc mừng bạn đã được bầu làm: ${winner.positionName}</p > 
                        <p>
                            Kết quả tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
                        </p>
                        ${req.body.winners.map((winner, index) =>
                            `<div>
                                <p>Vị trí: <span style="font-weight: 600">${winner.positionName}</span></p> 
                                <p>Người chiến thắng: <span style="font-weight: 600">${winner.candidateName}</span>
                                    Với số phiếu được bầu là: ${winner.voteCount}
                                </p>
                                <p>Thông tin liên hệ: <span style="font-weight: 600">${winner.email}</span></p>
                                <p>----------------------------------------------------------------</p>
                            </div>` )
                        }
                        <p>
                            Đăng nhập tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
                        </p>`;
                await sendMail(winner.email, subject, htmlContent);
            }
            res.json({
                status: 'success',
                message: 'Result Mail sent successfully',
                data: null
            })
        }catch (err) {
            res.status(500).json(err.message)
        }
    }
}

module.exports = new VoterController();
