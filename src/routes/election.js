const express = require('express');

const router = express.Router();
const authentication = require('../middleware/Authentication');
const electionController = require('../controllers/ElectionController');
const { validateBody, validateParams } = require('../middleware/ValidationMiddleware');
const electionSchema = require('../middleware/validation/election');
const pathParameter = require('../middleware/validation/pathParameter');

router.get(
    '/:voterId/searchByVoterId',
    authentication.authenticateToken,
    validateParams(pathParameter.pathVoterIdSchema),
    electionController.searchByVoterId,
);
router.get(
    '/:companyId/searchElection',
    authentication.authenticateToken,
    validateParams(pathParameter.pathCompanyIdSchema),
    electionController.searchElection,
);
router.get(
    '/:companyId/voterList',
    authentication.authenticateToken,
    validateParams(pathParameter.pathCompanyIdSchema),
    electionController.voterList,
);
router.get(
    '/:electionAddress/searchByElectionAddress',
    authentication.authenticateToken,
    validateParams(pathParameter.pathElectionAddressSchema),
    electionController.searchByElectionAddress,
);
router.patch(
    '/:companyId/voters',
    authentication.authenticateToken,
    validateParams(pathParameter.pathCompanyIdSchema),
    validateBody(electionSchema.updateVotersSchema),
    electionController.updateVoters,
);
router.patch(
    '/:companyId/updateTimeStart',
    authentication.authenticateToken,
    validateParams(pathParameter.pathCompanyIdSchema),
    validateBody(electionSchema.updateTimeStartSchema),
    electionController.updateTimeStart,
);
router.post(
    '/create',
    authentication.authenticateToken,
    validateBody(electionSchema.createSchema),
    electionController.create,
);

module.exports = router;
