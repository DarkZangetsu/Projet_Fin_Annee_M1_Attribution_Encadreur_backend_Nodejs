const express = require('express');
const router = express.Router();
const groupeController = require('../controllers/groupeController');

router.get('/', groupeController.getGroupes);
router.get('/:id', groupeController.getGroupe);
router.post('/', groupeController.createGroupe);
router.put('/:id', groupeController.updateGroupe);
router.delete('/:id', groupeController.deleteGroupe);

module.exports = router;