const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gradYear: { type: Number, required: true },
  department: { type: String, required: true },
  certUrl: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);