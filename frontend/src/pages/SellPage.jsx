import React, { useState } from 'react';

function SellPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    price: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Thank you! We will contact you shortly to list your property.');
    setFormData({ name: '', email: '', phone: '', propertyType: '', location: '', price: '', message: '' });
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📈 Sell Your Property</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Get the best price for your property in Belgaum</p>

        <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>🏠</span>
              <h4>Free Valuation</h4>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>Get an estimate for your property</p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>📸</span>
              <h4>Professional Photos</h4>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>High-quality images for listings</p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>📢</span>
              <h4>Premium Listing</h4>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>Featured on top of search results</p>
            </div>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>🤝</span>
              <h4>Expert Agents</h4>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>Connect with top local agents</p>
            </div>
          </div>

          <h3 style={{ marginBottom: '20px' }}>List Your Property Today</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <select required value={formData.propertyType} onChange={e => setFormData({...formData, propertyType: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <option value="">Select Property Type</option>
              <option value="apartment">Apartment/Flat</option>
              <option value="villa">Villa</option>
              <option value="house">Independent House</option>
              <option value="plot">Plot/Land</option>
              <option value="commercial">Commercial</option>
            </select>
            <input type="text" placeholder="Location" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <input type="text" placeholder="Expected Price" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <textarea placeholder="Additional Details" rows="3" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>List Property →</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellPage;