const express = require('express');
const router = express.Router();

const keyController = require('../controllers/KeyController');
const authentication = require('../middleware/Authentication');

router.get('/:companyId/keys', authentication.authenticateToken, keyController.rsaKeys); 
router.get('/:companyId/hashSignature', authentication.authenticateToken, keyController.hashSignature); 


module.exports = router;
