const express = require('express');
const router = express.Router();

const voterController = require('../controllers/VoterController.js');
const authentication = require('../middleware/Authentication');
const pathParameter = require('../middleware/validation/pathParameter');
const voterSchema = require('../middleware/validation/voter');
const { validateParams, validateBody } = require('../middleware/ValidationMiddleware');

//public routes
router.post('/login', validateBody(voterSchema.loginSchema), voterController.login);
router.post('/register', validateBody(voterSchema.registerSchema), voterController.register);

//private routes
router.get('/', authentication.authenticateToken, voterController.index);
router.get(
    '/:electionAddress/search',
    authentication.authenticateToken,
    validateParams(pathParameter.pathElectionAddressSchema),
    voterController.search,
);
router.get(
    '/:electionAddress/trash',
    authentication.authenticateToken,
    validateParams(pathParameter.pathElectionAddressSchema),
    voterController.trash,
);
router.get(
    '/:id/show',
    authentication.authenticateToken,
    validateParams(pathParameter.pathIdSchema),
    voterController.show,
);
router.post(
    '/create',
    authentication.authenticateToken,
    validateBody(voterSchema.createSchema),
    voterController.create,
);
router.put(
    '/:id',
    authentication.authenticateToken,
    validateParams(pathParameter.pathIdSchema),
    validateBody(voterSchema.updateSchema),
    voterController.update,
);
router.delete(
    '/:id',
    authentication.authenticateToken,
    validateParams(pathParameter.pathIdSchema),
    voterController.delete,
);
router.patch(
    '/:id/restore',
    authentication.authenticateToken,
    validateParams(pathParameter.pathIdSchema),
    voterController.restore,
);

module.exports = router;
