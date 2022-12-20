const express = require('express');
const router = express.Router();

const voterController = require('../controllers/VoterController.js');
const voterMiddleware = require('../middleware/VoterMiddleware')


router.post('/login', voterController.login);
// router.get('/:slug', voterController.show);
router.post('/create', voterMiddleware.registrationMiddleware, voterController.create);

module.exports = router;
