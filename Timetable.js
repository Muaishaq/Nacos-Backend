const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  department: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  courseTitle: { type: String, required: true },
  venue: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);