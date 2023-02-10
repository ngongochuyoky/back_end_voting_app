const express = require('express');
const router = express.Router();

const companyController = require('../controllers/CompanyController');
const authentication = require('../middleware/Authentication');

router.post('/register', companyController.register);
router.post('/login', companyController.login);

router.use(authentication.authenticateToken);
router.get('/:id', companyController.show);
router.post('/resultMail', companyController.resultMail);

module.exports = router;
