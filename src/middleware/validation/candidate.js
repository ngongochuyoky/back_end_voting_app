const yup = require('yup');

const sendMailNotificationSchema = yup.object({
    electionName: yup.string().trim().required(),
    positionName: yup.string().trim().required(),
    email: yup.string().email().required(),
});

module.exports = { sendMailNotificationSchema };
