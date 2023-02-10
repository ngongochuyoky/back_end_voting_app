const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/CandidateController');
const authentication = require('../middleware/Authentication');

router.use(authentication.authenticateToken);
router.post('/sendMailNotification', candidateController.sendMailNotification);

module.exports = router;
