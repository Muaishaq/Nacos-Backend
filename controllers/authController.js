const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide a username and password' });
  }

  try {
    // Check for admin and include passwordHash for comparison
   const admin = await Admin.findOne({ username });

    if (!admin || !admin.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token payload
    const payload = {
      id: admin._id,
      role: admin.role,
    };

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({ 
      success: true, 
      token: `Bearer ${token}`,
      role: admin.role 
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { login };
