const Timetable = require('../models/Timetable');

exports.getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json({ success: true, data: timetables });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

exports.createTimetable = async (req, res) => {
  try {
    const { day, time, courseTitle, venue } = req.body;
    const department = req.user.department;

    if (!day || !time || !courseTitle || !venue) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const newTimetable = new Timetable({
      department,
      day,
      time,
      courseTitle,
      venue
    });

    await newTimetable.save();
    res.status(201).json({ success: true, data: newTimetable });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

exports.updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const { day, time, courseTitle, venue } = req.body;
    const department = req.user.department;

    const timetable = await Timetable.findById(id);

    if (!timetable) {
      return res.status(404).json({ success: false, message: 'Timetable not found' });
    }

    if (timetable.department !== department) {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this timetable' });
    }

    timetable.day = day || timetable.day;
    timetable.time = time || timetable.time;
    timetable.courseTitle = courseTitle || timetable.courseTitle;
    timetable.venue = venue || timetable.venue;

    await timetable.save();
    res.json({ success: true, data: timetable });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

exports.deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const department = req.user.department;

    const timetable = await Timetable.findById(id);

    if (!timetable) {
      return res.status(404).json({ success: false, message: 'Timetable not found' });
    }

    if (timetable.department !== department) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this timetable' });
    }

    await timetable.deleteOne();
    res.json({ success: true, message: 'Timetable deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};