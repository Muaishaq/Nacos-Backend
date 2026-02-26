const Student = require('../models/Student');

// @desc    Verify a student's dues status by matriculation number
// @route   GET /api/verify/:matricNo
// @access  Public
const verifyStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ matricNo: req.params.matricNo });

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