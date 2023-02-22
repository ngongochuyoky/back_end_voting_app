// const nodeMailer = require('nodemailer');
const sendMail = require('../utils/mailer');
require('dotenv').config();

class CandidateController {
    //send Mail Notification for a candidate
    //[POST] /candidate/senMailNotification
    async sendMailNotification(req, res, next) {
        try {
            const subject = 'Thông báo đăng kí ứng viên tại ' + req.body.electionName;
            const htmlContent = `<span style="color:green; font-size: 16px">Chúc mừng bạn được đăng kí là ứng cử viên cho vị trí: </span > 
            <span style="font-weight: bold;"> 
                ${req.body.positionName} 
            </span> 
            <p>
                Tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
            </p>`;

            const response = await sendMail(req.body.email, subject, htmlContent);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CandidateController();
