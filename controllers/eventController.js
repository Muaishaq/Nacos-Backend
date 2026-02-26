const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (President only)
const createEvent = async (req, res) => {
  try {
    const { title, content, date, category } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const event = await Event.create({
      title,
      content,
      date,
      category,
      imageUrl,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
};