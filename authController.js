const Student = require('../models/Student');
const VP = require('../models/VP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, matricNo } = req.body;

    // Basic validation
    if (!name || !email || !matricNo) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    // Check if student exists
    const existingStudent = await Student.findOne({ matricNo });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Student already registered' });
    }

    // Generate ID (NACOS-26-XXXX)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const nacosId = `NACOS-26-${randomNum}`;

    // Create new student
    const student = new Student({
      name,
      email,
      matricNo,
      nacosId
    });

    await student.save();

    res.status(201).json({
      success: true,
      nacosId,
      message: 'Student registered successfully'
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

exports.recoverId = async (req, res) => {
  try {
    const { matricNo } = req.body;

    const student = await Student.findOne({ matricNo });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, nacosId: student.nacosId });
  } catch (error) {
    console.error('Recovery Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.seedVP = async (req, res) => {
  try {
    // Check if VP already exists to avoid duplicates
    const existingVP = await VP.findOne({ username: "vp_software" });
    if (existingVP) {
      return res.status(400).json({ success: false, message: "VP already seeded" });
    }

    const hashedPassword = await bcrypt.hash("vp-soft-2026", 10);
    const vp = new VP({
      username: "vp_software",
      passwordHash: hashedPassword,
      role: "vp_software",
      department: "Software Engineering"
    });
    await vp.save();
    res.json({ success: true, message: "VP Seeded Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.vpLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const vp = await VP.findOne({ username });
    if (!vp) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, vp.passwordHash);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: vp._id, role: vp.role, department: vp.department }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token, role: vp.role, department: vp.department });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};