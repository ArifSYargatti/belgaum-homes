const mongoose = require('mongoose');

// First, login to get token
async function login() {
  try {
    const response = await fetch('https://belgaum-homes-2.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@belgaumhomes.com',
        password: 'Admin@123'
      })
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    return null;
  }
}

// Get properties from local DB
async function getLocalProperties() {
  await mongoose.connect('mongodb://localhost:27017/belgaum_homes');
  const propertySchema = new mongoose.Schema({}, { strict: false });
  const Property = mongoose.model('Property', propertySchema);
  const props = await Property.find();
  return props.map(p => {
    const clean = p.toObject();
    delete clean._id;
    delete clean.__v;
    return clean;
  });
}

async function importToRender() {
  console.log('🔑 Logging in to Render...');
  const token = await login();
  if (!token) {
    console.log('❌ Failed to login. Please check admin credentials.');
    return;
  }
  console.log('✅ Logged in successfully');

  console.log('📊 Fetching local properties...');
  const properties = await getLocalProperties();
  console.log(`📊 Found ${properties.length} properties in local DB`);

  const API_URL = 'https://belgaum-homes-2.onrender.com/api/properties';

  let imported = 0;
  let failed = 0;
  
  for (const prop of properties) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(prop)
      });
      const data = await response.json();
      if (data.success) {
        imported++;
        console.log(`✅ ${imported}. ${prop.title}`);
      } else {
        failed++;
        console.log(`❌ Failed: ${prop.title} - ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      failed++;
      console.log(`❌ Failed: ${prop.title} - ${error.message}`);
    }
  }

  console.log(`\n✅ Imported ${imported} of ${properties.length} properties to Render!`);
  console.log(`❌ Failed: ${failed}`);
  
  // Verify count
  try {
    const verify = await fetch(API_URL);
    const data = await verify.json();
    console.log(`📊 Total properties on Render: ${data.count}`);
  } catch (e) {
    console.log('⚠️ Could not verify count');
  }
  
  process.exit(0);
}

importToRender().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});