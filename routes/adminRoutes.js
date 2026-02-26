const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadStudents } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

// POST /api/admin/upload-students
router.post('/upload-students', protect, authorize('President'), upload.single('file'), uploadStudents);

module.exports = router;