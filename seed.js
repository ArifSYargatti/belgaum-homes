const mongoose = require('mongoose');
require('dotenv').config();

const propertySchema = new mongoose.Schema({
  title: String, description: String, price: String, priceValue: Number,
  size: String, bedrooms: Number, bathrooms: Number, area: String,
  location: String, address: String, coordinates: { lat: Number, lng: Number },
  advantages: [String], amenities: [String], images: [String],
  premium: Boolean, featured: Boolean, isNewLaunch: Boolean, isExclusive: Boolean,
  status: String, views: Number, inquiries: Number
});

const Property = mongoose.model('Property', propertySchema);

const properties = [
  {
    title: "Luxury 3BHK in Shahapur", price: "₹85,00,000", priceValue: 8500000,
    size: "1500 sq ft", bedrooms: 3, bathrooms: 2, area: "Shahapur",
    location: "Near City Center Mall", address: "123, Club Road, Shahapur",
    coordinates: { lat: 15.8573, lng: 74.5047 },
    advantages: ["Close to schools", "Market nearby", "Parking", "24/7 Security"],
    amenities: ["Gym", "Swimming Pool", "Security", "Power Backup"],
    images: ["https://placehold.co/600x400/ff6b35/white?text=Luxury+3BHK"],
    premium: true, featured: true, isNewLaunch: false, isExclusive: true,
    status: "available", views: 0, inquiries: 0
  },
  {
    title: "Spacious 2BHK in Tilakwadi", price: "₹55,00,000", priceValue: 5500000,
    size: "1100 sq ft", bedrooms: 2, bathrooms: 2, area: "Tilakwadi",
    location: "Near Tilakwadi Market", address: "456, Tilakwadi Main Road",
    coordinates: { lat: 15.8495, lng: 74.5098 },
    advantages: ["Walking distance to market", "Public transport", "Quiet neighborhood"],
    amenities: ["Parking", "Security", "Lift", "24x7 Water"],
    images: ["https://placehold.co/600x400/4caf50/white?text=Spacious+2BHK"],
    premium: false, featured: false, isNewLaunch: false, isExclusive: false,
    status: "available", views: 0, inquiries: 0
  },
  {
    title: "Modern 2BHK in Camp Area", price: "₹65,00,000", priceValue: 6500000,
    size: "1250 sq ft", bedrooms: 2, bathrooms: 2, area: "Camp",
    location: "Near Military Hospital", address: "789, Camp Road",
    coordinates: { lat: 15.8612, lng: 74.5115 },
    advantages: ["Close to railway station", "Commercial area", "Good connectivity"],
    amenities: ["Gym", "Parking", "Security", "Intercom", "Lift"],
    images: ["https://placehold.co/600x400/2196f3/white?text=Modern+2BHK"],
    premium: true, featured: false, isNewLaunch: true, isExclusive: false,
    status: "available", views: 0, inquiries: 0
  },
  {
    title: "Premium 4BHK at RPD Cross", price: "₹1,25,00,000", priceValue: 12500000,
    size: "2200 sq ft", bedrooms: 4, bathrooms: 3, area: "RPD Cross",
    location: "Near RPD College", address: "101, RPD Cross",
    coordinates: { lat: 15.8667, lng: 74.5183 },
    advantages: ["Panoramic views", "Large balconies", "Premium finishes"],
    amenities: ["Swimming Pool", "Club House", "Gym", "Jogging Track", "Garden"],
    images: ["https://placehold.co/600x400/9c27b0/white?text=Premium+4BHK"],
    premium: true, featured: true, isNewLaunch: true, isExclusive: true,
    status: "available", views: 0, inquiries: 0
  },
  {
    title: "Affordable 1BHK in Gogte Chowk", price: "₹35,00,000", priceValue: 3500000,
    size: "750 sq ft", bedrooms: 1, bathrooms: 1, area: "Gogte Chowk",
    location: "Near Gogte College", address: "234, Gogte Chowk",
    coordinates: { lat: 15.8402, lng: 74.4965 },
    advantages: ["Budget-friendly", "Near college", "Good connectivity"],
    amenities: ["Parking", "Security", "24x7 Water"],
    images: ["https://placehold.co/600x400/ff9800/white?text=Affordable+1BHK"],
    premium: false, featured: false, isNewLaunch: false, isExclusive: false,
    status: "available", views: 0, inquiries: 0
  },
  {
    title: "2BHK Vadagaon - Near Bus Stand", price: "₹48,00,000", priceValue: 4800000,
    size: "980 sq ft", bedrooms: 2, bathrooms: 2, area: "Vadagaon",
    location: "Near Vadagaon Bus Stand", address: "56, Bus Stand Road",
    coordinates: { lat: 15.8460, lng: 74.4860 },
    advantages: ["Excellent connectivity", "Close to market", "Affordable"],
    amenities: ["Parking", "Security", "Lift"],
    images: ["https://placehold.co/600x400/00bcd4/white?text=2BHK+Vadagaon"],
    premium: false, featured: false, isNewLaunch: true, isExclusive: false,
    status: "available", views: 0, inquiries: 0
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/belgaum_homes');
    await Property.deleteMany({});
    await Property.insertMany(properties);
    console.log('✅ Database seeded with 6 properties!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding:', error);
    process.exit(1);
  }
}

seedDatabase();