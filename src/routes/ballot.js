const express = require('express');
const router = express.Router();

const ballotController = require('../controllers/BallotController');
const authentication = require('../middleware/Authentication');

router.use(authentication.authenticateToken);
router.post('/:voterId/vote', ballotController.vote); 
router.get('/:companyId/votes', ballotController.votes); 
router.get('/:companyId/:voterId/searchVote', ballotController.searchVote); 
router.get('/:companyId/numVoted/', ballotController.numVoted); 
router.post('/:id/decryptContent', ballotController.decryptContent); 
router.patch('/:id/updateIsCheck', ballotController.updateIsCheck); 


module.exports = router;
