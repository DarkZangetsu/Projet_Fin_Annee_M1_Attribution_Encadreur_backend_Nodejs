const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

router.get('/', etudiantController.getEtudiants);
router.get('/:id', etudiantController.getEtudiant);
router.post('/', etudiantController.createEtudiant);
router.put('/:id', etudiantController.updateEtudiant);
router.delete('/:id', etudiantController.deleteEtudiant);

module.exports = router;