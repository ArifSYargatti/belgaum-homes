import React from 'react';

function HomeInteriorsPage() {
  const interiorOptions = [
    { name: 'Modern Kitchen', price: '₹1.5L - ₹3L', style: 'Modern', image: '🍳' },
    { name: 'Living Room', price: '₹2L - ₹5L', style: 'Luxury', image: '🛋️' },
    { name: 'Bedroom', price: '₹1L - ₹2.5L', style: 'Classic', image: '🛏️' },
    { name: 'Bathroom', price: '₹80k - ₹1.5L', style: 'Contemporary', image: '🚿' },
    { name: 'Modular Furniture', price: '₹1L - ₹4L', style: 'Modern', image: '📦' },
    { name: 'False Ceiling', price: '₹50k - ₹1.2L', style: 'Designer', image: '💡' },
    { name: 'Wall Art', price: '₹20k - ₹80k', style: 'Abstract', image: '🎨' },
    { name: 'Lighting', price: '₹30k - ₹1L', style: 'Modern', image: '💡' },
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏠 Home Interiors</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Transform your home with Belgaum's best interior designers</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {interiorOptions.map((item, idx) => (
            <div key={idx} style={{ background: '#fff8f0', borderRadius: '12px', padding: '25px', textAlign: 'center', border: '1px solid #ffe0b2', transition: 'transform 0.3s' }}>
              <div style={{ fontSize: '3rem' }}>{item.image}</div>
              <h4 style={{ marginTop: '15px' }}>{item.name}</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>{item.price}</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Style: {item.style}</p>
              <button style={{ marginTop: '15px', padding: '8px 25px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>Get Quote</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', background: '#f8f9fa', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
          <h3>Need Professional Interior Design?</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>Connect with top interior designers in Belgaum</p>
          <button style={{ padding: '12px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Contact Designers →</button>
        </div>
      </div>
    </div>
  );
}

export default HomeInteriorsPage;