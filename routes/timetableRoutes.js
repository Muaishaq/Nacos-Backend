const express = require('express');
const router = express.Router();
const {
  createTimetableEntry,
  getTimetable,
  updateTimetableEntry,
  deleteTimetableEntry,
} = require('../controllers/timetableController');
const { protect, authorize } = require('../middleware/authMiddleware');

const vpRoles = ['VP_CS', 'VP_SE', 'VP_CYB', 'VP_IT'];

router
  .route('/')
  .post(protect, authorize(...vpRoles), createTimetableEntry)
  .get(getTimetable);

router
  .route('/:id')
  .put(protect, authorize(...vpRoles), updateTimetableEntry)
  .delete(protect, authorize(...vpRoles), deleteTimetableEntry);

module.exports = router;