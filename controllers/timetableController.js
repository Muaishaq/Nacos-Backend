const Timetable = require('../models/Timetable');

// Helper function to map a VP role to a department
const getDepartmentFromRole = (role) => {
  const departmentMap = {
    VP_CS: 'CS',
    VP_SE: 'SE',
    VP_CYB: 'CYB',
    VP_IT: 'IT',
  };
  return departmentMap[role];
};

// @desc    Create a timetable entry
// @route   POST /api/timetable
// @access  Private (VPs only)
const createTimetableEntry = async (req, res) => {
  try {
    const { day, time, courseTitle, venue } = req.body;
    const department = getDepartmentFromRole(req.user.role);

    if (!department) {
      return res.status(403).json({ message: 'User role cannot create timetables.' });
    }

    const entry = await Timetable.create({
      department,
      day,
      time,
      courseTitle,
      venue,
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get timetable entries (all or by department)
// @route   GET /api/timetable
// @access  Public
const getTimetable = async (req, res) => {
  try {
    const query = req.query.department ? { department: req.query.department } : {};
    const timetable = await Timetable.find(query);
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a timetable entry
// @route   PUT /api/timetable/:id
// @access  Private (VPs only)
const updateTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    const userDepartment = getDepartmentFromRole(req.user.role);
    if (entry.department !== userDepartment) {
      return res.status(403).json({ message: 'User not authorized to update this timetable' });
    }

    const updatedEntry = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a timetable entry
// @route   DELETE /api/timetable/:id
// @access  Private (VPs only)
const deleteTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    const userDepartment = getDepartmentFromRole(req.user.role);
    if (entry.department !== userDepartment) {
      return res.status(403).json({ message: 'User not authorized to delete this timetable' });
    }

    await entry.deleteOne();
    res.status(200).json({ message: 'Timetable entry removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTimetableEntry, getTimetable, updateTimetableEntry, deleteTimetableEntry };