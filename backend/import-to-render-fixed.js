const mongoose = require('mongoose');

const login = async () => {
  const res = await fetch('https://belgaum-homes-2.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@belgaumhomes.com', password: 'Admin@123' })
  });
  const data = await res.json();
  return data.token;
};

const importProperties = async () => {
  try {
    const token = await login();
    console.log('🔑 Logged in');
    
    await mongoose.connect('mongodb://localhost:27017/belgaum_homes');
    const Property = mongoose.model('Property', new mongoose.Schema({}, { strict: false }));
    const props = await Property.find();
    console.log('📊 Found', props.length, 'properties locally');
    
    let imported = 0;
    for (const p of props) {
      const clean = p.toObject();
      delete clean._id;
      delete clean.__v;
      
      const res = await fetch('https://belgaum-homes-2.onrender.com/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clean)
      });
      const data = await res.json();
      if (data.success) {
        imported++;
        console.log('✅', imported + '.', p.title);
      }
    }
    
    console.log('\n✅ Imported', imported, 'properties to Render!');
    
    const verify = await fetch('https://belgaum-homes-2.onrender.com/api/properties');
    const vData = await verify.json();
    console.log('📊 Total on Render:', vData.count);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit();
};

importProperties();