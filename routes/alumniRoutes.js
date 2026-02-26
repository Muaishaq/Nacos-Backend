const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { createAlumni, getAlumni } = require('../controllers/alumniController');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

router
  .route('/')
  .post(protect, authorize('President'), upload.single('image'), createAlumni)
  .get(getAlumni);

module.exports = router;

// POST /api/alumni (protected, President only)
// GET /api/alumni (public)