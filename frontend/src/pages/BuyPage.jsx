import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BuyPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [bhkFilter, setBhkFilter] = useState('all');

  const API_URL = 'https://belgaum-homes-api.onrender.com';

  useEffect(() => {
    fetch(`${API_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        setProperties(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prop.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prop.area?.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesPrice = true;
    if (priceFilter !== 'all') {
      const priceNum = parseInt(prop.price?.replace(/[^0-9]/g, '') || 0);
      if (priceFilter === 'below50') matchesPrice = priceNum < 5000000;
      else if (priceFilter === '50-80') matchesPrice = priceNum >= 5000000 && priceNum <= 8000000;
      else if (priceFilter === 'above80') matchesPrice = priceNum > 8000000;
    }
    const matchesBhk = bhkFilter === 'all' || prop.bedrooms === parseInt(bhkFilter);
    return matchesSearch && matchesPrice && matchesBhk;
  });

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>🏢 Loading properties...</div>;

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🏠 Buy Properties in Belgaum</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Find your dream home - Browse all available properties for sale</p>

        {/* Search & Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input type="text" placeholder="🔍 Search by area, location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '200px', flex: 1 }} />
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '150px' }}>
              <option value="all">All Prices</option>
              <option value="below50">Below ₹50 Lakhs</option>
              <option value="50-80">₹50L - ₹80L</option>
              <option value="above80">Above ₹80L</option>
            </select>
            <select value={bhkFilter} onChange={(e) => setBhkFilter(e.target.value)} style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '150px' }}>
              <option value="all">All BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>
            <button onClick={() => { setSearchTerm(''); setPriceFilter('all'); setBhkFilter('all'); }} style={{ padding: '12px 20px', background: '#666', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Clear</button>
          </div>
        </div>

        {/* Results Count */}
        <p style={{ marginBottom: '20px', color: '#666' }}>Showing {filteredProperties.length} properties</p>

        {/* Property Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
          {filteredProperties.map(property => (
            <Link key={property._id} to={`/property/${property._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={property.images?.[0] || 'https://placehold.co/600x400/eee/ccc?text=Property'} alt={property.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '5px' }}>{property.title}</h3>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>{property.price}</div>
                  <div style={{ color: '#666', fontSize: '0.8rem' }}>📍 {property.location}, {property.area}</div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>{property.bedrooms} BHK</span>
                    <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>{property.size}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyPage;

