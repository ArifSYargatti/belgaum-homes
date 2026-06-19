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
  origin: ['http://localhost:5173', 'https://belgaum-homes.vercel.app', 'https://belgaum-homes-2.onrender.com'],
  credentials: true
}));
app.use(express.json());

// ========== MONGODB CONNECTION ==========
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/belgaum_homes';

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// ========== SCHEMAS ==========

// User Schema
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

// Property Schema
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

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: String,
  propertyId: String,
  propertyTitle: String,
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

// Agent Schema
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: String,
  rating: Number,
  propertiesSold: Number,
  phone: String,
  email: String,
  image: String,
  verified: { type: Boolean, default: true },
  location: String,
  specialties: [String],
  languages: [String],
  about: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Property = mongoose.model('Property', propertySchema);
const Lead = mongoose.model('Lead', leadSchema);
const Agent = mongoose.model('Agent', agentSchema);

// ========== SAMPLE DATA ==========
const sampleProperties = [
  {
    title: "Luxury 3BHK in Shahapur",
    price: "₹85,00,000", priceValue: 8500000,
    size: "1500 sq ft", bedrooms: 3, bathrooms: 2,
    area: "Shahapur", location: "Near City Center Mall",
    advantages: ["Close to schools", "Market nearby", "Parking"],
    amenities: ["Gym", "Swimming Pool", "Security"],
    images: ["https://placehold.co/600x400/ff6b35/white?text=Luxury+3BHK"],
    premium: true, featured: true, isExclusive: true
  },
  {
    title: "Spacious 2BHK in Tilakwadi",
    price: "₹55,00,000", priceValue: 5500000,
    size: "1100 sq ft", bedrooms: 2, bathrooms: 2,
    area: "Tilakwadi", location: "Near Tilakwadi Market",
    advantages: ["Walking distance to market", "Quiet neighborhood"],
    amenities: ["Parking", "Security", "Lift"],
    images: ["https://placehold.co/600x400/4caf50/white?text=Spacious+2BHK"],
    premium: false
  },
  {
    title: "Modern 2BHK in Camp Area",
    price: "₹65,00,000", priceValue: 6500000,
    size: "1250 sq ft", bedrooms: 2, bathrooms: 2,
    area: "Camp", location: "Near Military Hospital",
    advantages: ["Close to railway station", "Good connectivity"],
    amenities: ["Gym", "Parking", "Security", "Lift"],
    images: ["https://placehold.co/600x400/2196f3/white?text=Modern+2BHK"],
    premium: true, isNewLaunch: true
  },
  {
    title: "Premium 4BHK at RPD Cross",
    price: "₹1,25,00,000", priceValue: 12500000,
    size: "2200 sq ft", bedrooms: 4, bathrooms: 3,
    area: "RPD Cross", location: "Near RPD College",
    advantages: ["Panoramic views", "Premium finishes"],
    amenities: ["Swimming Pool", "Club House", "Gym", "Garden"],
    images: ["https://placehold.co/600x400/9c27b0/white?text=Premium+4BHK"],
    premium: true, featured: true, isNewLaunch: true, isExclusive: true
  },
  {
    title: "Affordable 1BHK in Gogte Chowk",
    price: "₹35,00,000", priceValue: 3500000,
    size: "750 sq ft", bedrooms: 1, bathrooms: 1,
    area: "Gogte Chowk", location: "Near Gogte College",
    advantages: ["Budget-friendly", "Near college"],
    amenities: ["Parking", "Security", "Water Supply"],
    images: ["https://placehold.co/600x400/ff9800/white?text=Affordable+1BHK"],
    premium: false
  }
];

const sampleAgents = [
  {
    name: "Suresh Realty",
    experience: "15+ years",
    rating: 4.8,
    propertiesSold: 45,
    phone: "+91 98765 43210",
    email: "suresh@belgaumhomes.com",
    image: "👔",
    location: "Shahapur, Belgaum",
    verified: true,
    specialties: ["Luxury Homes", "3BHK+ Properties", "Premium Villas"],
    languages: ["Kannada", "Hindi", "English"],
    about: "15 years of experience in Belgaum real estate. Specialized in luxury properties."
  }
];

// ========== SEED DATABASE ==========
async function seedDatabase() {
  try {
    const propertyCount = await Property.countDocuments();
    if (propertyCount === 0) {
      await Property.insertMany(sampleProperties);
      console.log('✅ Database seeded with sample properties');
    }
    
    const agentCount = await Agent.countDocuments();
    if (agentCount === 0) {
      await Agent.insertMany(sampleAgents);
      console.log('✅ Database seeded with sample agents');
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

// ========== LOGIN ROUTE ==========
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

// Get user profile (Protected)
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

// ========== PUBLIC PROPERTY ROUTES ==========

// Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json({ success: true, data: properties, count: properties.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get popular properties
app.get('/api/properties/popular', async (req, res) => {
  try {
    const properties = await Property.find({ premium: true }).limit(6);
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get exclusive offers
app.get('/api/properties/exclusive', async (req, res) => {
  try {
    const properties = await Property.find({ isExclusive: true }).limit(6);
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get new launches
app.get('/api/properties/new-launches', async (req, res) => {
  try {
    const properties = await Property.find({ isNewLaunch: true }).limit(6);
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single property
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

// ========== PROTECTED ROUTES ==========

// Create property (Admin only)
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
    console.log('✅ Property created:', property.title);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update property (Admin only)
app.put('/api/properties/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete property (Admin only)
app.delete('/api/properties/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    await Property.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== LEAD ROUTES ==========

// Submit lead (Public)
app.post('/api/leads', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    
    if (lead.propertyId) {
      await Property.findByIdAndUpdate(lead.propertyId, { $inc: { inquiries: 1 } });
    }
    
    console.log('\n📞 NEW LEAD:', lead.name, '-', lead.phone);
    res.json({ success: true, message: 'Thank you! We will contact you shortly.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get leads (Admin only)
app.get('/api/leads', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update lead status (Admin only)
app.put('/api/leads/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete lead (Admin only)
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== AGENT ROUTES ==========

// Get all agents (Public)
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await Agent.find().sort({ rating: -1 });
    res.json({ success: true, data: agents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create agent (Admin only)
app.post('/api/agents', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json({ success: true, data: agent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update agent (Admin only)
app.put('/api/agents/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: agent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete agent (Admin only)
app.delete('/api/agents/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Agent deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== USER MANAGEMENT ==========

// Get all users (Admin only)
app.get('/api/auth/users', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'belgaum_homes_secret_2024');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== STATS ROUTE ==========

app.get('/api/stats', async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const totalUsers = await User.countDocuments();
    const totalAgents = await Agent.countDocuments();
    
    res.json({
      success: true,
      data: {
        totalProperties,
        totalLeads,
        newLeads,
        totalUsers,
        totalAgents
      }
    });
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
      popular: '/api/properties/popular',
      exclusive: '/api/properties/exclusive',
      newLaunches: '/api/properties/new-launches',
      leads: '/api/leads',
      agents: '/api/agents',
      stats: '/api/stats',
      auth: '/api/auth'
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
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🏠 Root: http://localhost:${PORT}/\n`);
  });
}

startServer();