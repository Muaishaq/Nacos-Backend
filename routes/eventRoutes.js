const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { createEvent, getEvents } = require('../controllers/eventController');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

router
  .route('/')
  .post(protect, authorize('President'), upload.single('image'), createEvent)
  .get(getEvents);

module.exports = router;

// POST /api/events (protected, President only)
// GET /api/events (public)