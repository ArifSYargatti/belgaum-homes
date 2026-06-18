const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ========== ROOT ROUTE - FIXES "Cannot GET /" ==========
app.get('/', (req, res) => {
  res.json({
    message: '🏠 Belgaum Homes API is live!',
    status: '✅ Running',
    endpoints: {
      root: '/',
      allProperties: '/api/properties',
      popular: '/api/properties/popular',
      exclusive: '/api/properties/exclusive',
      newLaunches: '/api/properties/new-launches',
      health: '/api/health',
      leads: '/api/leads'
    }
  });
});

// Sample properties data
const properties = [
  {
    _id: "1",
    title: "Luxury 3BHK in Shahapur",
    price: "₹85,00,000",
    size: "1500 sq ft",
    bedrooms: 3,
    bathrooms: 2,
    area: "Shahapur",
    location: "Near City Center Mall",
    images: ["https://placehold.co/600x400/ff6b35/white?text=Luxury+3BHK"],
    premium: true,
    featured: true,
    isNewLaunch: false,
    isExclusive: true
  },
  {
    _id: "2",
    title: "Spacious 2BHK in Tilakwadi",
    price: "₹55,00,000",
    size: "1100 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Tilakwadi",
    location: "Near Tilakwadi Market",
    images: ["https://placehold.co/600x400/4caf50/white?text=Spacious+2BHK"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    _id: "3",
    title: "Modern 2BHK in Camp Area",
    price: "₹65,00,000",
    size: "1250 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Camp",
    location: "Near Military Hospital",
    images: ["https://placehold.co/600x400/2196f3/white?text=Modern+2BHK"],
    premium: true,
    featured: false,
    isNewLaunch: true,
    isExclusive: false
  },
  {
    _id: "4",
    title: "Premium 4BHK at RPD Cross",
    price: "₹1,25,00,000",
    size: "2200 sq ft",
    bedrooms: 4,
    bathrooms: 3,
    area: "RPD Cross",
    location: "Near RPD College",
    images: ["https://placehold.co/600x400/9c27b0/white?text=Premium+4BHK"],
    premium: true,
    featured: true,
    isNewLaunch: true,
    isExclusive: true
  },
  {
    _id: "5",
    title: "Affordable 1BHK in Gogte Chowk",
    price: "₹35,00,000",
    size: "750 sq ft",
    bedrooms: 1,
    bathrooms: 1,
    area: "Gogte Chowk",
    location: "Near Gogte College",
    images: ["https://placehold.co/600x400/ff9800/white?text=Affordable+1BHK"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    _id: "6",
    title: "2BHK Vadagaon - Near Bus Stand",
    price: "₹48,00,000",
    size: "980 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Vadagaon",
    location: "Near Vadagaon Bus Stand",
    images: ["https://placehold.co/600x400/00bcd4/white?text=2BHK+Vadagaon"],
    premium: false,
    featured: false,
    isNewLaunch: true,
    isExclusive: false
  }
];

// ========== API ROUTES ==========

// Get all properties
app.get('/api/properties', (req, res) => {
  res.json({ 
    success: true, 
    data: properties, 
    count: properties.length 
  });
});

// Get popular properties
app.get('/api/properties/popular', (req, res) => {
  const popular = properties.filter(p => p.premium).slice(0, 6);
  res.json({ success: true, data: popular });
});

// Get exclusive offers
app.get('/api/properties/exclusive', (req, res) => {
  const exclusive = properties.filter(p => p.isExclusive).slice(0, 6);
  res.json({ success: true, data: exclusive });
});

// Get new launches
app.get('/api/properties/new-launches', (req, res) => {
  const newLaunches = properties.filter(p => p.isNewLaunch).slice(0, 6);
  res.json({ success: true, data: newLaunches });
});

// Get single property
app.get('/api/properties/:id', (req, res) => {
  const property = properties.find(p => p._id === req.params.id);
  if (property) {
    res.json({ success: true, data: property });
  } else {
    res.status(404).json({ success: false, error: 'Property not found' });
  }
});

// Submit lead
app.post('/api/leads', (req, res) => {
  console.log('\n' + '='.repeat(50));
  console.log('📞 NEW LEAD RECEIVED!');
  console.log('='.repeat(50));
  console.log(`👤 Name: ${req.body.name}`);
  console.log(`📧 Email: ${req.body.email}`);
  console.log(`📱 Phone: ${req.body.phone}`);
  console.log(`🏠 Property: ${req.body.propertyTitle || 'General Inquiry'}`);
  console.log('='.repeat(50));
  
  res.json({ 
    success: true, 
    message: 'Thank you! We will contact you shortly.' 
  });
});

// Get all leads (for admin)
app.get('/api/leads', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Leads endpoint - check server console for new leads' 
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    properties: properties.length,
    timestamp: new Date().toISOString()
  });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`\n🚀 BELGAUM HOMES BACKEND`);
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`✅ ${properties.length} properties loaded`);
  console.log(`🏠 Root: http://localhost:${PORT}/`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`📋 Properties: http://localhost:${PORT}/api/properties\n`);
});