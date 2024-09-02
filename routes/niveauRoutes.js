const express = require('express');
const router = express.Router();
const niveauController = require('../controllers/niveauController');

router.get('/', niveauController.getNiveaux);
router.get('/:id', niveauController.getNiveau);
router.post('/', niveauController.createNiveau);
router.put('/:id', niveauController.updateNiveau);
router.delete('/:id', niveauController.deleteNiveau);

module.exports = router;