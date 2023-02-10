const express = require('express');
const router = express.Router();

const voterController = require('../controllers/VoterController.js');
const authentication = require('../middleware/Authentication');

//public routes
router.post('/login', voterController.login);
router.post('/register', voterController.register);

//private routes
router.use(authentication.authenticateToken)
router.get('/', voterController.index);
router.get('/:electionAddress/search', voterController.search);
router.get('/:electionAddress/trash', voterController.trash);
router.get('/:id/show', voterController.show);
router.post('/create', voterController.create);
router.put('/:id', voterController.update); 
router.delete('/:id', voterController.delete); 
router.patch('/:id/restore', voterController.restore); 

module.exports = router;
