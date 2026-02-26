const express = require('express');
const router = express.Router();
const { verifyStudent } = require('../controllers/publicController');

router.get('/verify/:matricNo', verifyStudent);

module.exports = router;