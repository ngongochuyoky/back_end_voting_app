const express = require('express');
const router = express.Router();

const voterController = require('../controllers/VoterController.js');
const authentication = require('../middleware/Authentication');


router.get('/:electionAddress/allVoter', authentication.authenticateToken, voterController.index);
router.get('/:electionAddress/trash', authentication.authenticateToken, voterController.trash);
router.get('/:electionAddress/totalVoters', authentication.authenticateToken, voterController.totalVoters);
router.get('/:id/show', authentication.authenticateToken, voterController.show);
router.post('/login', voterController.login);
router.post('/register', authentication.authenticateToken, voterController.create);
router.put('/:id', authentication.authenticateToken, voterController.update); 
router.delete('/:id', authentication.authenticateToken, voterController.delete); 
router.patch('/:id/restore', authentication.authenticateToken, voterController.restore); 

module.exports = router;
