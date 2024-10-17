const express = require('express');
const router = express.Router();
const groupController = require('../controllers/afficheController');

router.get('/', groupController.getGroups);

module.exports = router;