const express = require('express');
const router = express.Router();

const keyController = require('../controllers/KeyController');
const authentication = require('../middleware/Authentication');

//private routes
router.use(authentication.authenticateToken);
router.get('/:companyId/keys', keyController.rsaKeys); 
router.get('/:companyId/hashSignature', keyController.hashSignature); 


module.exports = router;
