const express = require('express');
const router = express.Router();
const CandidateController = require('../controllers/CandidateController');

router.post('/sendMailNotification', CandidateController.sendMailNotification);

module.exports = router;
