const express = require('express');
const router = express.Router();

const companyController = require('../controllers/CompanyController');
const authentication = require('../middleware/Authentication');
const companySchema = require('../middleware/validation/company');
const { pathIdSchema } = require('../middleware/validation/pathParameter');
const { validateBody, validateParams } = require('../middleware/ValidationMiddleware');

router.post('/register', validateBody(companySchema.registerSchema), companyController.register);
router.post('/login', validateBody(companySchema.loginSchema), companyController.login);

router.get('/:id', authentication.authenticateToken, validateParams(pathIdSchema), companyController.show);
router.post(
    '/resultMail',
    authentication.authenticateToken,
    validateBody(companySchema.resultMailSchema),
    companyController.resultMail,
);

module.exports = router;
