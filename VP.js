const mongoose = require('mongoose');

const vpSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('VP', vpSchema);