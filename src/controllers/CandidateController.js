// const nodeMailer = require('nodemailer');
const sendMail = require('../utils/mailer');
require('dotenv').config();

class CandidateController {
    //send Mail Notification for a candidate
    //[POST] /candidate/senMailNotification
    sendMailNotification(req, res, next) {
        const subject = 'Thông báo đăng kí ứng viên tại '+ req.body.electionName;
        const htmlContent = `<span style="color:green; font-size: 16px">Chúc mừng bạn được đăng kí là ứng cử viên cho vị trí: </span > 
            <span style="font-weight: bold;"> 
                ${req.body.positionName} 
            </span> 
            <p>
                Tại cuộc bầu chọn: <span style="font-weight: bold;">${req.body.electionName} </span>
            </p>
            <p>
                Theo dõi tại website: <a href=${process.env.FONTEND_URL}>${process.env.FONTEND_URL}</a>
            </p>`;
        sendMail(req.body.email, subject, htmlContent)
            .then((response) => res.json(response))
            .catch((err) => res.json(err));
        
    }
}

module.exports = new CandidateController();
