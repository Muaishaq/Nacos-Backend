const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    gradYear: {
      type: Number,
      required: true,
    },
    currentRole: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false, // An image might not always be available
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alumni', alumniSchema);