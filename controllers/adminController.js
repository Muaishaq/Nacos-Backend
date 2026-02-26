const fs = require('fs');
const csv = require('csv-parser');
const Student = require('../models/Student');

// @desc    Upload students via CSV
// @route   POST /api/admin/upload-students
// @access  Private (Admin)
const uploadStudents = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a CSV file' });
  }

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv({
      mapHeaders: ({ header }) => {
        const trimmed = header.trim().toLowerCase();
        if (trimmed === 'matricno') return 'matricNo';
        if (trimmed === 'fullname' || trimmed === 'name') return 'fullName';
        return header.trim();
      }
    }))
    .on('error', (error) => {
      console.error('CSV Parse Error:', error);
      return res.status(400).json({ message: 'Invalid CSV file format' });
    })
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const { department, level } = req.body;
        if (!department || !level) {
          // Clean up and send error
          fs.unlinkSync(req.file.path);
          return res.status(400).json({ message: 'Department and Level are required.' });
        }

        // Get current max ID number to increment from
        const lastStudent = await Student.findOne({ nacosId: { $regex: /^NACOS-26-/ } })
          .sort({ nacosId: -1 })
          .select('nacosId');
        
        let currentIdNum = 0;
        if (lastStudent && lastStudent.nacosId) {
          const parts = lastStudent.nacosId.split('-');
          if (parts.length === 3) {
            currentIdNum = parseInt(parts[2], 10);
          }
        }

        let updatedCount = 0;
        let createdCount = 0;

        for (const row of results) {
          const matricNo = row.matricNo ? row.matricNo.trim() : null;
          const fullName = row.fullName ? row.fullName.trim() : null;
          
          if (!matricNo || !fullName) continue;

          const existingStudent = await Student.findOne({ matricNo });

          if (existingStudent) {
            existingStudent.hasPaidDues = true;
            await existingStudent.save();
            updatedCount++;
          } else {
            currentIdNum++;
            const nacosId = `NACOS-26-${currentIdNum.toString().padStart(4, '0')}`;
            
            await Student.create({
              matricNo,
              name: fullName,
              department: department,
              level: level,
              nacosId,
              hasPaidDues: true
            });
            createdCount++;
          }
        }

        // Delete the temporary file
        fs.unlinkSync(req.file.path);

        res.status(200).json({
          message: 'CSV processed successfully',
          updated: updatedCount,
          created: createdCount
        });
      } catch (error) {
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: error.message });
      }
    });
};

module.exports = { uploadStudents };