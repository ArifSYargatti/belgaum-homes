// add-properties.js
const mongoose = require('mongoose');
require('dotenv').config();

const propertySchema = new mongoose.Schema({
  title: String, price: String, priceValue: Number,
  size: String, bedrooms: Number, bathrooms: Number,
  area: String, location: String, advantages: [String],
  amenities: [String], images: [String], premium: Boolean
});

const Property = mongoose.model('Property', propertySchema);

const newProperties = [
  {
    title: "Luxury Villa in Shahapur",
    price: "₹1,50,00,000",
    priceValue: 15000000,
    size: "2500 sq ft",
    bedrooms: 4,
    bathrooms: 4,
    area: "Shahapur",
    location: "Near City Center",
    advantages: ["Private Garden", "Terrace", "4 Parking"],
    amenities: ["Private Pool", "Gym", "Security", "Garden"],
    images: ["https://placehold.co/600x400/ff6b35/white?text=Villa"],
    premium: true
  }
  // Add more properties...
];

async function addProperties() {
  await mongoose.connect('mongodb://localhost:27017/belgaum_homes');
  await Property.insertMany(newProperties);
  console.log('✅ Properties added!');
  process.exit();
}

addProperties();