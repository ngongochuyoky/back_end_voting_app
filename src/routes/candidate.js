const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/CandidateController');
const authentication = require('../middleware/Authentication');

router.post('/sendMailNotification', authentication.authenticateToken, candidateController.sendMailNotification);

module.exports = router;
