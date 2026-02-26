const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    matricNo: {
      type: String,
      required: [true, 'Matriculation number is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    department: {
      type: String,
      required: true,
      enum: ['CS', 'SE', 'CYB', 'IT'],
    },
    level: {
      type: Number,
      required: [true, 'Level is required'],
    },
    nacosId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents to have a null value for this field
    },
    hasPaidDues: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);