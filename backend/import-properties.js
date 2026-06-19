const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/belgaum_homes';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: false },
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

// All 22 Properties with UNIQUE titles
const properties = [
  {
    title: "Luxury 3BHK in Shahapur - Premium",
    price: "₹85,00,000",
    priceValue: 8500000,
    size: "1500 sq ft",
    bedrooms: 3,
    bathrooms: 2,
    area: "Shahapur",
    location: "Near City Center Mall",
    description: "Premium apartment with modern amenities in the heart of Belgaum.",
    advantages: ["Close to schools", "Market nearby", "Parking available", "24/7 Security"],
    amenities: ["Gym", "Swimming Pool", "24/7 Security", "Power Backup", "Children's Play Area"],
    images: ["https://placehold.co/600x400/ff6b35/white?text=Luxury+3BHK"],
    premium: true,
    featured: true,
    isNewLaunch: false,
    isExclusive: true
  },
  {
    title: "2BHK Premium in Shahapur - Modern",
    price: "₹65,00,000",
    priceValue: 6500000,
    size: "1200 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Shahapur",
    location: "Near Maruti Galli",
    description: "Well-designed 2BHK with modern interiors and excellent ventilation.",
    advantages: ["Walking distance to market", "Near temple", "Gated community"],
    amenities: ["Gym", "Parking", "Security", "Lift"],
    images: ["https://placehold.co/600x400/4caf50/white?text=2BHK+Shahapur"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "Shahapur Villa with Private Pool",
    price: "₹1,50,00,000",
    priceValue: 15000000,
    size: "2500 sq ft",
    bedrooms: 4,
    bathrooms: 4,
    area: "Shahapur",
    location: "Near Club Road",
    description: "Stunning luxury villa with private garden and swimming pool.",
    advantages: ["Private garden", "Swimming pool", "4 car parking", "Premium finishes"],
    amenities: ["Private Pool", "Gym", "Garden", "Security", "Club House"],
    images: ["https://placehold.co/600x400/9c27b0/white?text=Luxury+Villa"],
    premium: true,
    featured: true,
    isNewLaunch: true,
    isExclusive: true
  },
  {
    title: "Spacious 2BHK in Tilakwadi - Family Home",
    price: "₹55,00,000",
    priceValue: 5500000,
    size: "1100 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Tilakwadi",
    location: "Near Tilakwadi Market",
    description: "Well-maintained apartment with excellent connectivity.",
    advantages: ["Walking distance to market", "Public transport nearby", "Quiet neighborhood"],
    amenities: ["Parking", "Security", "Lift", "24x7 Water Supply"],
    images: ["https://placehold.co/600x400/2196f3/white?text=2BHK+Tilakwadi"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "3BHK Luxury Villa in Tilakwadi",
    price: "₹1,20,00,000",
    priceValue: 12000000,
    size: "2000 sq ft",
    bedrooms: 3,
    bathrooms: 3,
    area: "Tilakwadi",
    location: "Near Ramdev Galli",
    description: "Independent villa with garden and parking.",
    advantages: ["Private garden", "Independent house", "Great locality"],
    amenities: ["Private Garden", "Car Parking", "Security", "Solar Panels"],
    images: ["https://placehold.co/600x400/00bcd4/white?text=Villa+Tilakwadi"],
    premium: true,
    featured: true,
    isNewLaunch: false,
    isExclusive: true
  },
  {
    title: "Modern 2BHK in Camp Area - New Construction",
    price: "₹65,00,000",
    priceValue: 6500000,
    size: "1250 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Camp",
    location: "Near Military Hospital",
    description: "Newly constructed apartment in prime Camp area.",
    advantages: ["Close to railway station", "Commercial area nearby", "Good road connectivity"],
    amenities: ["Gym", "Parking", "Security", "Intercom", "Lift"],
    images: ["https://placehold.co/600x400/e91e63/white?text=2BHK+Camp"],
    premium: true,
    featured: false,
    isNewLaunch: true,
    isExclusive: false
  },
  {
    title: "3BHK Army Quarters Style in Camp",
    price: "₹75,00,000",
    priceValue: 7500000,
    size: "1400 sq ft",
    bedrooms: 3,
    bathrooms: 2,
    area: "Camp",
    location: "Near Clock Tower",
    description: "Spacious apartment with vintage charm and modern amenities.",
    advantages: ["Heritage area", "Close to cantonment", "Well-connected"],
    amenities: ["Parking", "Security", "Power Backup", "Water Softener"],
    images: ["https://placehold.co/600x400/3f51b5/white?text=3BHK+Camp"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "Premium 4BHK at RPD Cross - City View",
    price: "₹1,25,00,000",
    priceValue: 12500000,
    size: "2200 sq ft",
    bedrooms: 4,
    bathrooms: 3,
    area: "RPD Cross",
    location: "Near RPD College",
    description: "Spacious luxury apartment with stunning city views.",
    advantages: ["Panoramic views", "Large balconies", "Premium finishes"],
    amenities: ["Swimming Pool", "Club House", "Gym", "Jogging Track", "Landscaped Gardens"],
    images: ["https://placehold.co/600x400/ff9800/white?text=4BHK+RPD"],
    premium: true,
    featured: true,
    isNewLaunch: true,
    isExclusive: true
  },
  {
    title: "2BHK Budget Friendly in RPD Cross",
    price: "₹48,00,000",
    priceValue: 4800000,
    size: "950 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "RPD Cross",
    location: "Near Hanuman Nagar",
    description: "Affordable apartment with all basic amenities.",
    advantages: ["Good connectivity", "Schools nearby", "Hospital nearby"],
    amenities: ["Parking", "Security", "Water Supply"],
    images: ["https://placehold.co/600x400/8bc34a/white?text=2BHK+RPD"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "Affordable 1BHK in Gogte Chowk - Students",
    price: "₹35,00,000",
    priceValue: 3500000,
    size: "750 sq ft",
    bedrooms: 1,
    bathrooms: 1,
    area: "Gogte Chowk",
    location: "Near Gogte College",
    description: "Perfect for bachelors and small families.",
    advantages: ["Budget-friendly", "Near college", "Good connectivity"],
    amenities: ["Parking", "Security", "24x7 Water Supply"],
    images: ["https://placehold.co/600x400/795548/white?text=1BHK+Gogte"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "2BHK Near KLE University - Students",
    price: "₹52,00,000",
    priceValue: 5200000,
    size: "1050 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Gogte Chowk",
    location: "Near KLE University",
    description: "Perfect for students and faculty members.",
    advantages: ["Walking distance to university", "Student-friendly", "Good rental income"],
    amenities: ["Parking", "Security", "Study Room", "WiFi Ready"],
    images: ["https://placehold.co/600x400/607d8b/white?text=2BHK+KLE"],
    premium: false,
    featured: false,
    isNewLaunch: true,
    isExclusive: false
  },
  {
    title: "3BHK New Launch in Vadagaon - Modern",
    price: "₹78,00,000",
    priceValue: 7800000,
    size: "1450 sq ft",
    bedrooms: 3,
    bathrooms: 2,
    area: "Vadagaon",
    location: "Near Vishwanath Nagar",
    description: "Newly launched residential project with modern amenities.",
    advantages: ["New construction", "Modern design", "Vastu compliant"],
    amenities: ["Gym", "Swimming Pool", "Club House", "Parking", "Security"],
    images: ["https://placehold.co/600x400/673ab7/white?text=3BHK+Vadagaon"],
    premium: true,
    featured: true,
    isNewLaunch: true,
    isExclusive: false
  },
  {
    title: "2BHK Vadagaon Near Bus Stand",
    price: "₹48,00,000",
    priceValue: 4800000,
    size: "980 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Vadagaon",
    location: "Near Vadagaon Bus Stand",
    description: "Conveniently located near public transport.",
    advantages: ["Excellent connectivity", "Close to market", "Affordable"],
    amenities: ["Parking", "Security", "Lift"],
    images: ["https://placehold.co/600x400/009688/white?text=2BHK+Vadagaon"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "Luxury 3BHK in Machhe - Professionals",
    price: "₹92,00,000",
    priceValue: 9200000,
    size: "1600 sq ft",
    bedrooms: 3,
    bathrooms: 3,
    area: "Machhe",
    location: "Near Machhe Industrial Area",
    description: "Premium apartment for working professionals.",
    advantages: ["Close to industrial area", "Good for professionals", "Modern amenities"],
    amenities: ["Gym", "Swimming Pool", "Club House", "Party Hall", "Garden"],
    images: ["https://placehold.co/600x400/ff5722/white?text=3BHK+Machhe"],
    premium: true,
    featured: false,
    isNewLaunch: true,
    isExclusive: false
  },
  {
    title: "1BHK for Bachelors in Machhe",
    price: "₹32,00,000",
    priceValue: 3200000,
    size: "680 sq ft",
    bedrooms: 1,
    bathrooms: 1,
    area: "Machhe",
    location: "Near Machhe Circle",
    description: "Budget-friendly option for bachelors and students.",
    advantages: ["Affordable rent", "Near bus stop", "Safe locality"],
    amenities: ["Parking", "Security", "Water Supply"],
    images: ["https://placehold.co/600x400/ffc107/white?text=1BHK+Machhe"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "3BHK Premium in Sambhaji Nagar - Garden View",
    price: "₹88,00,000",
    priceValue: 8800000,
    size: "1550 sq ft",
    bedrooms: 3,
    bathrooms: 2,
    area: "Sambhaji Nagar",
    location: "Near Sambhaji Garden",
    description: "Beautiful apartment with garden view.",
    advantages: ["Garden facing", "Peaceful area", "Well-maintained"],
    amenities: ["Gym", "Parking", "Security", "Power Backup", "Garden"],
    images: ["https://placehold.co/600x400/4caf50/white?text=3BHK+Sambhaji"],
    premium: true,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "2BHK Family Home in Sambhaji Nagar",
    price: "₹58,00,000",
    priceValue: 5800000,
    size: "1080 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Sambhaji Nagar",
    location: "Near Market Yard",
    description: "Perfect for families with children.",
    advantages: ["Schools nearby", "Hospital nearby", "Safe locality"],
    amenities: ["Parking", "Security", "Children's Play Area"],
    images: ["https://placehold.co/600x400/2196f3/white?text=2BHK+Sambhaji"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "2BHK Near HP Petrol Pump - Commuters",
    price: "₹52,00,000",
    priceValue: 5200000,
    size: "1000 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Hindustan Petroleum",
    location: "Near HP Petrol Bunk",
    description: "Conveniently located near main highway.",
    advantages: ["Excellent connectivity", "Close to highway", "Good for commuters"],
    amenities: ["Parking", "Security", "Water Supply"],
    images: ["https://placehold.co/600x400/9e9e9e/white?text=2BHK+HP"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "3BHK Row House in Udyambag - Terrace",
    price: "₹95,00,000",
    priceValue: 9500000,
    size: "1700 sq ft",
    bedrooms: 3,
    bathrooms: 3,
    area: "Udyambag",
    location: "Near Udyambag Police Station",
    description: "Spacious row house with private terrace.",
    advantages: ["Private terrace", "Independent house", "Good locality"],
    amenities: ["Private Terrace", "Car Parking", "Security", "Garden Area"],
    images: ["https://placehold.co/600x400/d32f2f/white?text=Row+House"],
    premium: true,
    featured: true,
    isNewLaunch: true,
    isExclusive: true
  },
  {
    title: "1BHK Affordable in Udyambag - Seniors",
    price: "₹30,00,000",
    priceValue: 3000000,
    size: "650 sq ft",
    bedrooms: 1,
    bathrooms: 1,
    area: "Udyambag",
    location: "Near Udyambag Temple",
    description: "Most affordable option in prime location.",
    advantages: ["Very affordable", "Close to temple", "Good for seniors"],
    amenities: ["Parking", "Water Supply", "Security"],
    images: ["https://placehold.co/600x400/e91e63/white?text=1BHK+Udyambag"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  },
  {
    title: "2BHK Near Hanuman Temple - Peaceful",
    price: "₹45,00,000",
    priceValue: 4500000,
    size: "920 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    area: "Hanuman Nagar",
    location: "Near Hanuman Temple",
    description: "Well-connected residential area with good community.",
    advantages: ["Temple nearby", "Good community", "Affordable"],
    amenities: ["Parking", "Security", "Water Supply"],
    images: ["https://placehold.co/600x400/ff9800/white?text=2BHK+Hanuman"],
    premium: false,
    featured: false,
    isNewLaunch: false,
    isExclusive: false
  }
];

async function importProperties() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing properties
    const deleted = await Property.deleteMany({});
    console.log(`🗑️ Cleared ${deleted.deletedCount} existing properties`);
    
    // Add new properties one by one to catch errors
    let imported = 0;
    for (const prop of properties) {
      try {
        await Property.create(prop);
        imported++;
        console.log(`✅ Imported: ${prop.title}`);
      } catch (err) {
        console.log(`❌ Failed: ${prop.title} - ${err.message}`);
      }
    }
    
    console.log(`\n✅ Imported ${imported} of ${properties.length} properties successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importProperties();