const express = require('express');
const router = express.Router();
const { registerStudent, recoverId, seedVP, vpLogin } = require('../controllers/authController');

router.post('/register', registerStudent);
router.post('/recover-id', recoverId);
router.post('/seed-vp', seedVP);
router.post('/vp-login', vpLogin);

module.exports = router;