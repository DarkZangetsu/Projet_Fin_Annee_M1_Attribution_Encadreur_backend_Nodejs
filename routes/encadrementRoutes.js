const express = require('express');
const router = express.Router();
const encadrementController = require('../controllers/encadrementController');

router.get('/', encadrementController.getEncadrements);
router.get('/:id', encadrementController.getEncadrement);
router.post('/', encadrementController.createEncadrement);
router.put('/:id', encadrementController.updateEncadrement);
router.delete('/:id', encadrementController.deleteEncadrement);

module.exports = router;

