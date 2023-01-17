const express = require('express');
const router = express.Router();

const ballotController = require('../controllers/BallotController');
const authentication = require('../middleware/Authentication');

router.post('/:voterId/vote', authentication.authenticateToken, ballotController.vote); 
router.get('/:companyId/votes', authentication.authenticateToken, ballotController.votes); 
router.get('/:companyId/:voterId/searchVote', authentication.authenticateToken, ballotController.searchVote); 
router.get('/:companyId/numVoted/', authentication.authenticateToken, ballotController.numVoted); 
router.post('/:id/decryptContent', authentication.authenticateToken, ballotController.decryptContent); 
router.patch('/:id/updateIsCheck', authentication.authenticateToken, ballotController.updateIsCheck); 


module.exports = router;
