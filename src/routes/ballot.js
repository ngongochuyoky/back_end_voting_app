const express = require('express');
const router = express.Router();

const ballotController = require('../controllers/BallotController');
const authentication = require('../middleware/Authentication');
const { validateBody, validateParams } = require('../middleware/ValidationMiddleware');
const ballotSchema = require('../middleware/validation/ballot');
const pathParameter = require('../middleware/validation/pathParameter');

router.get(
    '/:companyId/votes',
    authentication.authenticateToken,
    validateParams(pathParameter.pathCompanyIdSchema),
    ballotController.votes,
);
router.get(
    '/:companyId/:voterId/searchVote',
    authentication.authenticateToken,
    validateParams(pathParameter.pathSearchVoteSchema),
    ballotController.searchVote,
);
router.get(
    '/:companyId/numVoted/',
    authentication.authenticateToken,
    validateParams(pathParameter.pathCompanyIdSchema),
    ballotController.numVoted,
);

router.post(
    '/:voterId/vote',
    authentication.authenticateToken,
    validateParams(pathParameter.pathVoterIdSchema),
    validateBody(ballotSchema.voteSchema),
    ballotController.vote,
);

router.post(
    '/:id/decryptContent',
    authentication.authenticateToken,
    validateParams(pathParameter.pathIdSchema),
    validateBody(ballotSchema.decryptContentSchema),
    ballotController.decryptContent,
);
router.patch(
    '/:id/updateIsCheck',
    authentication.authenticateToken,
    validateParams(pathParameter.pathIdSchema),
    ballotController.updateIsCheck,
);

module.exports = router;
