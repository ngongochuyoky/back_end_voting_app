require('dotenv').config();

module.exports = {
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
    SECURE: process.env.MAIL_SECURE,
    USERNAME: process.env.MAIL_USERNAME,
    PASSWORD: process.env.MAIL_PASSWORD, 
    FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,    
}