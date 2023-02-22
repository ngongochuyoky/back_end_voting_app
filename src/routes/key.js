const express = require('express');
const router = express.Router();

const keyController = require('../controllers/KeyController');
const authentication = require('../middleware/Authentication');
const { validateParams } = require('../middleware/ValidationMiddleware');
const pathParameter = require('../middleware/validation/pathParameter');

//private routes
router.get(
    '/:companyId/keys',
    authentication.authenticateToken,
    validateParams(pathParameter.pathCompanyIdSchema),
    keyController.rsaKeys,
);
router.get(
    '/:companyId/hashSignature',
    authentication.authenticateToken,
    validateParams(pathParameter.pathCompanyIdSchema),
    keyController.hashSignature,
);

module.exports = router;
