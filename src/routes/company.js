const express = require('express');
const router = express.Router();

const companyController = require('../controllers/CompanyController');
const companyMiddleware = require('../middleware/CompanyMiddleware');

router.post('/register', companyMiddleware.registrationMiddleware, companyController.register);
router.post('/login', companyController.login);

module.exports = router;