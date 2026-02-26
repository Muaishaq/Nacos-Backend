const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matricNo: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  nacosId: { type: String, required: true, unique: true },
  track: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);