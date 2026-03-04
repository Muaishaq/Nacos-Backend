const Student = require('../models/Student');

// @desc    Verify a student's dues status by matriculation number
// @route   GET /api/verify/:matricNo
// @access  Public
const verifyStudent = async (req, res) => {
  try {
    const decodedMatric = decodeURIComponent(req.params.matricNo).trim();
    // Escape special characters for regex
    const escapedMatric = decodedMatric.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    // Perform a case-insensitive search for the exact matric number
    const student = await Student.findOne({ matricNo: new RegExp('^' + escapedMatric + '$', 'i') });

    if (!student) {
      return res.status(404).json({ message: 'Student not found with this matriculation number.' });
    }

    // Return only the necessary public information
    res.status(200).json({
      name: student.name,
      matricNo: student.matricNo,
      nacosId: student.nacosId,
      hasPaidDues: student.hasPaidDues,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { verifyStudent };