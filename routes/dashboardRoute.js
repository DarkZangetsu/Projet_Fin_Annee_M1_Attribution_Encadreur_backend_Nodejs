const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashbordController');

router.get('/', dashboardController.getDashboardData);

module.exports = router;