const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/CandidateController');
const authentication = require('../middleware/Authentication');
const { sendMailNotificationSchema } = require('../middleware/validation/candidate');
const { validateBody } = require('../middleware/ValidationMiddleware');

router.post(
    '/sendMailNotification',
    authentication.authenticateToken,
    validateBody(sendMailNotificationSchema),
    candidateController.sendMailNotification,
);

module.exports = router;    
