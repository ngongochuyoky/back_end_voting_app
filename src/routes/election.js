const express = require('express');

const router = express.Router();
const authentication = require('../middleware/Authentication');
const electionController = require('../controllers/ElectionController');

router.use(authentication.authenticateToken);
router.get('/:voterId/searchByVoterId', electionController.searchByVoterId);
router.get('/:companyId/searchElection', electionController.searchElection);
router.get('/:companyId/voterList', electionController.voterList);
router.get('/:electionAddress/searchByElectionAddress', electionController.searchByElectionAddress);
router.patch('/:companyId/voters', electionController.updateVoters);
router.patch('/:companyId/updateTimeStart', electionController.updateTimeStart);
router.post('/create', electionController.create);

module.exports = router;
