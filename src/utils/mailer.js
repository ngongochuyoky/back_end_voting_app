const nodeMailer = require('nodemailer');
const mailConfig = require('../config/mail');

function sendMail(to, subject, htmlContent) {
    return new Promise((resolve, reject) => {
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
                ? reject({ status: 'error', message: 'Failure Sending Mail', data: null })
                : resolve({ status: 'success', message: 'Email send successfully', data: null });
        });
    });
}
module.exports = sendMail;
