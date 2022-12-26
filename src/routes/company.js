const express = require('express');
const router = express.Router();

const companyController = require('../controllers/CompanyController');
const authentication = require('../middleware/Authentication');


router.get('/:id', companyController.show);
router.post('/register', companyController.register);
router.post('/login', companyController.login);
router.post('/resultMail', authentication.authenticateToken, companyController.resultMail); 

module.exports = router;