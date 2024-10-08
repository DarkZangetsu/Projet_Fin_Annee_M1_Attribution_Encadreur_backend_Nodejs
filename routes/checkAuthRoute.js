const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');

router.get('/check-auth', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Token is valid', user: req.user });
});

module.exports = router;
