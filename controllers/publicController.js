const Student = require('../models/Student');

const verifyStudent = async (req, res) => {
  try {
    // Reads from the request body sent by the frontend
    const { matricNo } = req.body;

    if (!matricNo) {
      return res.status(400).json({ message: 'Matriculation number is required.' });
    }

    // Trims spaces and escapes slashes for the database search
    const cleanMatric = matricNo.trim();
    const escapedMatric = cleanMatric.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    // Case-insensitive search
    const student = await Student.findOne({ 
      matricNo: new RegExp('^' + escapedMatric + '$', 'i') 
    });

    if (!student) {
      return res.status(404).json({ message: 'Student record not found.' });
    }

    // Sends all fields needed for the frontend card
    res.status(200).json({
      name: student.name,
      matricNo: student.matricNo,
      department: student.department,
      level: student.level,
      nacosId: student.nacosId,
      hasPaidDues: student.hasPaidDues,
    });
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { verifyStudent };
