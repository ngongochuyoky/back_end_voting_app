const express = require('express');

const router = express.Router();
const authentication = require('../middleware/Authentication');
const electionController = require('../controllers/ElectionController');

// router.get('/', authentication.authenticateToken, electionController.index);
router.get('/:voterId/searchByVoterId', authentication.authenticateToken, electionController.searchByVoterId);
router.get('/:companyId/searchByCompanyId', authentication.authenticateToken, electionController.searchByCompanyId);
router.get('/:companyId/voterList', authentication.authenticateToken, electionController.voterList)
router.get('/:electionAddress/searchByElectionAddress', authentication.authenticateToken, electionController.searchByElectionAddress)
router.patch('/:companyId/voters', authentication.authenticateToken, electionController.updateVoters)
router.patch('/:companyId/updateTimeStart', authentication.authenticateToken, electionController.updateTimeStart)
router.post('/create', authentication.authenticateToken, electionController.create)


module.exports = router