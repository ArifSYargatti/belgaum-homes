import React, { useState } from 'react';

function HomeInteriorsPage() {
  const [showConsultation, setShowConsultation] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const [homeSize, setHomeSize] = useState('');
  const [rooms, setRooms] = useState('');
  const [style, setStyle] = useState('modern');
  const [costResult, setCostResult] = useState(null);
  const [kitchenSize, setKitchenSize] = useState('');
  const [wardrobeSize, setWardrobeSize] = useState('');
  const [kitchenResult, setKitchenResult] = useState(null);

  const designers = [
    { id: 1, name: "Studio Belgaum", experience: "8+ years", rating: 4.8, projects: 120, specialties: ["Modern", "Luxury"], phone: "+91 98765 43210", image: "🎨", location: "Shahapur" },
    { id: 2, name: "DreamSpace Interiors", experience: "10+ years", rating: 4.7, projects: 150, specialties: ["Contemporary", "Classic"], phone: "+91 98765 43211", image: "🛋️", location: "Tilakwadi" },
    { id: 3, name: "Belgaum Design Studio", experience: "6+ years", rating: 4.6, projects: 85, specialties: ["Bohemian", "Scandinavian"], phone: "+91 98765 43212", image: "🏡", location: "Camp Area" },
    { id: 4, name: "Urban Interiors", experience: "12+ years", rating: 4.9, projects: 200, specialties: ["Luxury", "Modern"], phone: "+91 98765 43213", image: "✨", location: "RPD Cross" },
    { id: 5, name: "GreenLeaf Designs", experience: "5+ years", rating: 4.4, projects: 60, specialties: ["Sustainable", "Minimalist"], phone: "+91 98765 43214", image: "🌿", location: "Gogte Chowk" }
  ];

  const services = [
    { icon: "🛋️", name: "Living Room Design", desc: "Beautiful living spaces" },
    { icon: "🍳", name: "Modern Kitchen Design", desc: "Functional & stylish kitchens" },
    { icon: "🛏️", name: "Bedroom Design", desc: "Comfortable & elegant bedrooms" },
    { icon: "🚿", name: "Bathroom Design", desc: "Luxurious bathroom spaces" },
    { icon: "📦", name: "Modular Furniture", desc: "Custom furniture solutions" },
    { icon: "💡", name: "Lighting Design", desc: "Perfect lighting for every room" },
    { icon: "🎨", name: "Wall Art & Decor", desc: "Beautiful wall treatments" },
    { icon: "🪟", name: "Window Treatments", desc: "Curtains & blinds design" },
    { icon: "🏗️", name: "False Ceiling", desc: "Designer ceiling solutions" },
    { icon: "🪴", name: "Home Styling", desc: "Complete home styling" }
  ];

  const interiorOptions = [
    { name: 'Modern Kitchen', price: '₹1.5L - ₹3L', style: 'Modern', image: '🍳' },
    { name: 'Living Room', price: '₹2L - ₹5L', style: 'Luxury', image: '🛋️' },
    { name: 'Bedroom', price: '₹1L - ₹2.5L', style: 'Classic', image: '🛏️' },
    { name: 'Bathroom', price: '₹80k - ₹1.5L', style: 'Contemporary', image: '🚿' },
    { name: 'Modular Furniture', price: '₹1L - ₹4L', style: 'Modern', image: '📦' },
    { name: 'False Ceiling', price: '₹50k - ₹1.2L', style: 'Designer', image: '💡' }
  ];

  const calculateCost = () => {
    const size = parseFloat(homeSize);
    const roomCount = parseFloat(rooms);
    if (size && roomCount) {
      let baseRate = 800;
      if (style === 'luxury') baseRate = 1500;
      else if (style === 'modern') baseRate = 1000;
      else if (style === 'classic') baseRate = 1200;
      const totalCost = size * baseRate;
      const roomCost = roomCount * 50000;
      setCostResult({ total: totalCost + roomCost, baseCost: totalCost, roomCost: roomCost });
    }
  };

  const calculateKitchenWardrobe = () => {
    const kitchen = parseFloat(kitchenSize) || 0;
    const wardrobe = parseFloat(wardrobeSize) || 0;
    const kitchenCost = kitchen * 2500;
    const wardrobeCost = wardrobe * 3000;
    setKitchenResult({
      kitchenCost: kitchenCost,
      wardrobeCost: wardrobeCost,
      total: kitchenCost + wardrobeCost
    });
  };

  return (
    <div style={{ padding: '40px 0', background: '#f5f7fb' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏠 Home Interiors</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Transform your home with Belgaum's best interior designers</p>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px', background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {['services', 'designers', 'consultation', 'calculator', 'kitchen'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '10px 20px',
              background: activeTab === tab ? '#E31B23' : 'transparent',
              color: activeTab === tab ? 'white' : '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal'
            }}>
              {tab === 'services' && '🛠️ Services'}
              {tab === 'designers' && '👨‍🎨 Designers'}
              {tab === 'consultation' && '📋 Consultation'}
              {tab === 'calculator' && '💰 Cost Calc'}
              {tab === 'kitchen' && '🍳 Kitchen/Wardrobe'}
            </button>
          ))}
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {services.map((service, idx) => (
                <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '3rem' }}>{service.icon}</div>
                  <h4>{service.name}</h4>
                  <p style={{ color: '#666' }}>{service.desc}</p>
                </div>
              ))}
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Popular Interior Packages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
              {interiorOptions.map((item, idx) => (
                <div key={idx} style={{ background: '#fff8f0', borderRadius: '12px', padding: '25px', textAlign: 'center', border: '1px solid #ffe0b2' }}>
                  <div style={{ fontSize: '3rem' }}>{item.image}</div>
                  <h4>{item.name}</h4>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>{item.price}</p>
                  <p style={{ color: '#666' }}>Style: {item.style}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Designers Tab */}
        {activeTab === 'designers' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
            {designers.map((d) => (
              <div key={d.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ fontSize: '3rem' }}>{d.image}</div>
                  <div><h3>{d.name}</h3><p style={{ color: '#666', fontSize: '0.8rem' }}>📍 {d.location}</p></div>
                  <div style={{ marginLeft: 'auto', background: '#e8f5e9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>⭐ {d.rating}</div>
                </div>
                <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '8px', borderRadius: '6px' }}>
                    <div style={{ fontWeight: 'bold' }}>{d.experience}</div>
                    <div style={{ color: '#666', fontSize: '0.7rem' }}>Experience</div>
                  </div>
                  <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '8px', borderRadius: '6px' }}>
                    <div style={{ fontWeight: 'bold' }}>{d.projects}</div>
                    <div style={{ color: '#666', fontSize: '0.7rem' }}>Projects</div>
                  </div>
                  <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '8px', borderRadius: '6px' }}>
                    <div style={{ fontWeight: 'bold' }}>{d.rating}⭐</div>
                    <div style={{ color: '#666', fontSize: '0.7rem' }}>Rating</div>
                  </div>
                </div>
                <button style={{ width: '100%', marginTop: '15px', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Contact Designer 📞</button>
              </div>
            ))}
          </div>
        )}

        {/* Consultation Tab */}
        {activeTab === 'consultation' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2>📋 Design Consultation</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Get a free design consultation from Belgaum's top interior designers</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('✅ Your consultation request has been submitted!\n\nA designer will contact you within 24 hours.');
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name</label><input type="text" placeholder="Your name" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
                <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number</label><input type="tel" placeholder="Phone number" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
                <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label><input type="email" placeholder="Email address" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
              </div>
              <button type="submit" style={{ padding: '12px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Request Consultation →</button>
            </form>
          </div>
        )}

        {/* Cost Calculator Tab */}
        {activeTab === 'calculator' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2>💰 Full Home Interior Cost Calculator</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Estimate the cost of your home interior design</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Home Size (sq ft)</label><input type="number" value={homeSize} onChange={(e) => setHomeSize(e.target.value)} placeholder="e.g., 1200" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Number of Rooms</label><input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder="e.g., 3" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Design Style</label><select value={style} onChange={(e) => setStyle(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}><option value="modern">Modern</option><option value="luxury">Luxury</option><option value="classic">Classic</option></select></div>
            </div>
            <button onClick={calculateCost} style={{ padding: '12px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Cost</button>
            {costResult && (
              <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
                <h3 style={{ color: '#E31B23' }}>Estimated Interior Cost</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '10px' }}>
                  <div style={{ background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}><p style={{ color: '#666', fontSize: '0.8rem' }}>Base Cost</p><p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>₹{costResult.baseCost.toLocaleString()}</p></div>
                  <div style={{ background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}><p style={{ color: '#666', fontSize: '0.8rem' }}>Room Cost</p><p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>₹{costResult.roomCost.toLocaleString()}</p></div>
                  <div style={{ background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}><p style={{ color: '#666', fontSize: '0.8rem' }}>Total Cost</p><p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E31B23' }}>₹{costResult.total.toLocaleString()}</p></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Kitchen/Wardrobe Calculator Tab */}
        {activeTab === 'kitchen' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2>🍳 Kitchen/Wardrobe Calculator</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Estimate the cost of your kitchen and wardrobe designs</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Kitchen Size (sq ft)</label><input type="number" value={kitchenSize} onChange={(e) => setKitchenSize(e.target.value)} placeholder="e.g., 80" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
              <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Wardrobe Size (sq ft)</label><input type="number" value={wardrobeSize} onChange={(e) => setWardrobeSize(e.target.value)} placeholder="e.g., 40" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} /></div>
            </div>
            <button onClick={calculateKitchenWardrobe} style={{ padding: '12px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Cost</button>
            {kitchenResult && (
              <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
                <h3 style={{ color: '#E31B23' }}>Estimated Cost</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '10px' }}>
                  <div style={{ background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}><p style={{ color: '#666', fontSize: '0.8rem' }}>Kitchen Cost</p><p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>₹{kitchenResult.kitchenCost.toLocaleString()}</p></div>
                  <div style={{ background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}><p style={{ color: '#666', fontSize: '0.8rem' }}>Wardrobe Cost</p><p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>₹{kitchenResult.wardrobeCost.toLocaleString()}</p></div>
                  <div style={{ background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}><p style={{ color: '#666', fontSize: '0.8rem' }}>Total Cost</p><p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E31B23' }}>₹{kitchenResult.total.toLocaleString()}</p></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeInteriorsPage;
