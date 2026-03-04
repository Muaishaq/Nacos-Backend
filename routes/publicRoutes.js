const express = require('express');
const router = express.Router();
const { verifyStudent } = require('../controllers/publicController');

// MUST be a POST request to handle matric numbers with slashes safely
router.post('/verify', verifyStudent);

module.exports = router;
