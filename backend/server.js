const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors({
  origin: ['http://localhost:5173', 'https://belgaum-homes.vercel.app', 'https://belgaum-homes-api.onrender.com'],
  credentials: true
}));
app.use(express.json());

// ========== MONGODB CONNECTION ==========
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/belgaum_homes';

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// ========== USER SCHEMA ==========
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'agent', 'builder', 'owner', 'customer'], 
    default: 'customer' 
  },
  company: String,
  location: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ========== SAMPLE DATA ==========
async function seedDatabase() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin@123', salt);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@belgaumhomes.com',
        phone: '9876543210',
        password: hashedPassword,
        role: 'admin',
        verified: true
      });
      console.log('✅ Admin user created');
    }
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
}

// ========== AUTH ROUTES ==========

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, company, location } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || 'customer',
      company,
      location,
      verified: role === 'admin' ? true : false
    });
    
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'belgaum_homes_secret_2024',
      { expiresIn: '30d' }
    );
    
    console.log(`✅ New ${role} registered: ${name} (${email})`);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== LOGIN ROUTE - VERIFIED WORKING ==========
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('📩 Login attempt:', email);
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', email);
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'belgaum_homes_secret_2024',
      { expiresIn: '30d' }
    );
    
    console.log(`✅ ${user.role} logged in: ${user.name}`);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        verified: user.verified,
        company: user.company,
        location: user.location
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== GET USER PROFILE ==========
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

// ========== PROPERTY SCHEMA ==========
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: String,
  priceValue: Number,
  size: String,
  bedrooms: Number,
  bathrooms: Number,
  area: String,
  location: String,
  advantages: [String],
  amenities: [String],
  images: [String],
  premium: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  isNewLaunch: { type: Boolean, default: false },
  isExclusive: { type: Boolean, default: false },
  status: { type: String, default: 'available' },
  views: { type: Number, default: 0 },
  inquiries: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

// ========== PROPERTY ROUTES ==========

app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json({ success: true, data: properties, count: properties.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/properties/popular', async (req, res) => {
  try {
    const properties = await Property.find({ premium: true }).limit(6);
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/properties/exclusive', async (req, res) => {
  try {
    const properties = await Property.find({ isExclusive: true }).limit(6);
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/properties/new-launches', async (req, res) => {
  try {
    const properties = await Property.find({ isNewLaunch: true }).limit(6);
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    property.views += 1;
    await property.save();
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== CREATE PROPERTY ==========
app.post('/api/properties', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== HEALTH CHECK ==========
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ========== ROOT ROUTE ==========
app.get('/', (req, res) => {
  res.json({
    message: '🏠 Belgaum Homes API is running!',
    version: '2.0.0',
    status: '✅ Online',
    endpoints: {
      root: '/',
      health: '/api/health',
      properties: '/api/properties',
      auth: '/api/auth/login',
      register: '/api/auth/register'
    }
  });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 10000;

async function startServer() {
  await seedDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 BELGAUM HOMES BACKEND`);
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`✅ MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log(`📧 Test Login: admin@belgaumhomes.com / Admin@123`);
    console.log(`🏠 Root: http://localhost:${PORT}/\n`);
  });
}

startServer();