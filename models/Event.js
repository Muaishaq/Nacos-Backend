const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  category: {
    type: String,
    enum: ['Official Statement', 'Events', 'Sports', 'Tech'],
    required: true,
    default: 'Official Statement'
  },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Event', eventSchema);
