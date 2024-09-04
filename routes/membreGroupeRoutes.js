const express = require('express');
const router = express.Router();
const membreGroupeController = require('../controllers/membreGroupeController');

router.get('/', membreGroupeController.getMembreGroupes);
router.get('/:id', membreGroupeController.getMembreGroupe);
router.post('/', membreGroupeController.createMembreGroupe);
router.put('/:id', membreGroupeController.updateMembreGroupe);
router.delete('/:id', membreGroupeController.deleteMembreGroupe);

module.exports = router;