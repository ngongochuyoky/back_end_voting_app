const express = require('express');
const router = express.Router();

const voterController = require('../controllers/VoterController.js');
const authentication = require('../middleware/Authentication');


router.post('/login', voterController.login);
// router.get('/:slug', voterController.show);
router.post('/register', authentication.authenticateToken, voterController.create);
router.post('/update', authentication.authenticateToken, voterController.updateVoter); 
router.post('/delete', authentication.authenticateToken, voterController.removeVoter); 
router.post('/resultMail', authentication.authenticateToken, voterController.resultMail); 
router.get('/', authentication.authenticateToken, voterController.index);

module.exports = router;
