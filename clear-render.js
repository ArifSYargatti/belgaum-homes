const login = async () => {
  const res = await fetch('https://belgaum-homes-2.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@belgaumhomes.com', password: 'Admin@123' })
  });
  const data = await res.json();
  return data.token;
};

const deleteAll = async () => {
  try {
    const token = await login();
    console.log('🔑 Logged in');
    
    // Get all properties
    const getRes = await fetch('https://belgaum-homes-2.onrender.com/api/properties');
    const data = await getRes.json();
    console.log('📊 Found', data.count, 'properties on Render');
    
    let deleted = 0;
    for (const p of data.data) {
      console.log('🗑️ Deleting:', p.title);
      const delRes = await fetch(`https://belgaum-homes-2.onrender.com/api/properties/${p._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (delRes.ok) {
        deleted++;
        console.log('✅ Deleted:', p.title);
      } else {
        console.log('❌ Failed to delete:', p.title);
      }
    }
    
    console.log('\n✅ Total deleted:', deleted);
    
    // Verify
    const verify = await fetch('https://belgaum-homes-2.onrender.com/api/properties');
    const vData = await verify.json();
    console.log('📊 Remaining on Render:', vData.count);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit();
};

deleteAll();