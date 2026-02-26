const Alumni = require('../models/Alumni');

// @desc    Create new alumni (Wall of Fame) entry
// @route   POST /api/alumni
// @access  Private (President only)
const createAlumni = async (req, res) => {
  try {
    const { fullName, gradYear, currentRole } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const alumni = await Alumni.create({
      fullName,
      gradYear,
      currentRole,
      imageUrl,
    });
    res.status(201).json(alumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all alumni entries
// @route   GET /api/alumni
// @access  Public
const getAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAlumni,
  getAlumni,
};