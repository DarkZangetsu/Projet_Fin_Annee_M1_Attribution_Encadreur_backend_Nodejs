const express = require('express');
const router = express.Router();
const enseignantController = require('../controllers/enseignantController');

router.get('/', enseignantController.getEnseignants);
router.get('/:id', enseignantController.getEnseignant);
router.post('/', enseignantController.createEnseignant);
router.put('/:id', enseignantController.updateEnseignant);
router.delete('/:id', enseignantController.deleteEnseignant);

module.exports = router;