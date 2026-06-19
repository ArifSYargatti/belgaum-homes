const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  role: String,
  verified: Boolean
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/belgaum_homes');
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);
    
    // Delete existing admin
    await User.deleteOne({ email: 'admin@belgaumhomes.com' });
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@belgaumhomes.com',
      phone: '9876543210',
      password: hashedPassword,
      role: 'admin',
      verified: true
    });
    
    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@belgaumhomes.com');
    console.log('🔑 Password: Admin@123');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();