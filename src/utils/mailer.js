const nodeMailer = require('nodemailer');
const mailConfig = require('../config/mail');
const createError = require('../lib/error/errorFactory');
const commonError = require('../lib/error/commonError');
const {formatSuccess} = require('../lib/response'); 

function sendMail(to, subject, htmlContent) {
    return new Promise((resolve, reject) => {
        console.log(to)
        const transport = nodeMailer.createTransport({
            service: 'gmail',
            host: mailConfig.HOST,
            port: mailConfig.PORT,
            secure: mailConfig.SECURE,
            auth: {
                user: mailConfig.USERNAME,
                pass: mailConfig.PASSWORD,
            },
        });
        const messageOptions = {
            from: mailConfig.FROM_ADDRESS,
            to: to,
            subject: subject,
            html: htmlContent,
        };
        transport.sendMail(messageOptions, (err, info) => {
            return err
                ? reject(createError(commonError.FAILED_EMAIL_SEND))
                : resolve(formatSuccess(null, {message: 'Email send successfully'}));
        });
    });
}
module.exports = sendMail;
