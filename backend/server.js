const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const helmet = require('helmet');

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/belgaum_homes';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  console.log('\n⚠️  Starting with MOCK DATA mode...');
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
  address: String,
  coordinates: { lat: Number, lng: Number },
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

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: String,
  propertyId: String,
  propertyTitle: String,
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);
const Lead = mongoose.model('Lead', leadSchema);

// Sample data for initial seeding
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
    premium: false, featured: false
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

// Seed database function
async function seedDatabase() {
  try {
    const count = await Property.countDocuments();
    if (count === 0) {
      await Property.insertMany(sampleProperties);
      console.log('✅ Database seeded with sample properties');
    }
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
}

// API Routes
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

app.post('/api/leads', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    
    console.log('\n' + '='.repeat(50));
    console.log('📞 NEW LEAD RECEIVED!');
    console.log('='.repeat(50));
    console.log(`👤 Name: ${req.body.name}`);
    console.log(`📧 Email: ${req.body.email}`);
    console.log(`📱 Phone: ${req.body.phone}`);
    console.log(`🏠 Property: ${req.body.propertyTitle || 'General'}`);
    console.log('='.repeat(50));
    
    res.json({ success: true, message: 'Lead submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString() 
  });
});

// Initialize database and start server
const PORT = process.env.PORT || 5001;

async function startServer() {
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`\n🚀 BELGAUM HOMES BACKEND`);
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`✅ MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Using Mock Data'}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health\n`);
  });
}

startServer();