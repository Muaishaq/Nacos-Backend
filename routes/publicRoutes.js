const express = require('express');
const router = express.Router();
const { verifyStudent } = require('../controllers/publicController');

// Remove the /:matricNo completely! Just leave it as '/verify'
router.post('/verify', verifyStudent);

module.exports = router;
