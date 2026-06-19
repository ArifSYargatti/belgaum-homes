const axios = require('axios');

const API_URL = 'https://belgaum-homes-2.onrender.com/api/properties';

// First, login to get token
async function login() {
  try {
    const response = await axios.post('https://belgaum-homes-2.onrender.com/api/auth/login', {
      email: 'admin@belgaumhomes.com',
      password: 'Admin@123'
    });
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return null;
  }
}

// Then import properties
async function importProperties() {
  const token = await login();
  if (!token) {
    console.log('❌ Failed to login. Please check admin credentials.');
    return;
  }

  console.log('✅ Logged in successfully');

  // Import each property
  const properties = [
    // Add your 22 properties here - simplified version
    {
      title: "Luxury 3BHK in Shahapur",
      price: "₹85,00,000", priceValue: 8500000,
      size: "1500 sq ft", bedrooms: 3, bathrooms: 2,
      area: "Shahapur", location: "Near City Center Mall",
      description: "Premium apartment with modern amenities.",
      advantages: ["Close to schools", "Market nearby"],
      amenities: ["Gym", "Swimming Pool", "Security"],
      images: ["https://placehold.co/600x400/ff6b35/white?text=Luxury+3BHK"],
      premium: true, featured: true
    },
    // ... add all 22 properties
  ];

  for (const prop of properties) {
    try {
      const response = await axios.post(API_URL, prop, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(`✅ Imported: ${prop.title}`);
    } catch (error) {
      console.log(`❌ Failed: ${prop.title} - ${error.response?.data?.error || error.message}`);
    }
  }
}

importProperties();