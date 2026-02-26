const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const VP = require('./models/VP');

dotenv.config();

const vps = [
  { username: 'vp_software', password: 'vp-soft-2026', role: 'vp_software', department: 'Software Engineering' },
  { username: 'vp_cs', password: 'vp-cs-2026', role: 'vp_cs', department: 'Computer Science' },
  { username: 'vp_cyber', password: 'vp-cyber-2026', role: 'vp_cyber', department: 'Cybersecurity' },
  { username: 'vp_it', password: 'vp-it-2026', role: 'vp_it', department: 'Information Technology' }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    await VP.deleteMany({});
    console.log('Cleared existing VPs...');

    for (const vp of vps) {
      const hashedPassword = await bcrypt.hash(vp.password, 10);
      await VP.create({
        username: vp.username,
        passwordHash: hashedPassword,
        role: vp.role,
        department: vp.department
      });
    }

    console.log('-----------------------------------');
    console.log('VP Accounts Seeded Successfully:');
    vps.forEach(vp => console.log(`Dept: ${vp.department} | User: ${vp.username} | Pass: ${vp.password}`));
    console.log('-----------------------------------');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();