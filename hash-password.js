const bcrypt = require('bcryptjs');

async function createAdminUser() {
  // --- CHOOSE YOUR ADMIN PASSWORD ---
  // Replace this with the password you want to use to log in.
  const password = 'nacos_admin_password_123!';
  // ----------------------------------

  console.log('Generating hash for the admin user...');

  // bcryptjs is already in your package.json dependencies
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log('\n--- New Admin User Details ---');
  console.log('Use these values to create the user in your MongoDB database.');
  console.log('\nUsername: president');
  console.log('Role:     President');
  console.log('\nCOPY THIS HASHED PASSWORD:');
  console.log(hashedPassword);
  console.log('---------------------------------');
}

createAdminUser();