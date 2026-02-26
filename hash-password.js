const bcrypt = require('bcryptjs');

async function createAdminUser() {
  // --- CHOOSE YOUR ADMIN PASSWORD ---
  const password = 'nacos001';
  // ----------------------------------
  const username = 'president';
  const role = 'President';

  console.log('Generating hash for the admin user...');

  // bcryptjs is already in your package.json dependencies
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  console.log('\n--- IMPORTANT: MANUAL DATABASE UPDATE REQUIRED ---');
  console.log('1. Connect to your MongoDB database (e.g., using MongoDB Compass or `mongosh`).');
  console.log('2. Switch to your database (e.g., `use your_db_name`).');
  console.log('3. (Optional but recommended) Remove the old incorrect user: `db.users.deleteOne({ username: "president" });`');
  console.log('4. Copy and paste the following command to insert the correct admin user:');
  console.log('\n--------------------- COPY BELOW ---------------------\n');
  console.log(`db.users.insertOne({
  "username": "${username}",
  "passwordHash": "${hashedPassword}",
  "role": "${role}"
});`);
  console.log('\n--------------------- END COPY ---------------------\n');
  console.log(`After running the command, you can log in with:`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
  console.log('----------------------------------------------------');
}

createAdminUser();