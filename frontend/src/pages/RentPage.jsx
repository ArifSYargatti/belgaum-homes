import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RentPage() {
  const [rentalProperties, setRentalProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedPopular, setSelectedPopular] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showShareRequirement, setShowShareRequirement] = useState(false);

  const API_URL = 'https://belgaum-homes-2.onrender.com';

  useEffect(() => {
    fetch(`${API_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        const allProperties = data.data || [];
        // For rent, we can filter properties that have 'rent' status
        // or show all properties with a rent flag
        // For now, we'll show all properties as rental options
        setRentalProperties(allProperties);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredProperties = rentalProperties.filter(prop => {
    // Search filter
    const matchesSearch = prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prop.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prop.location?.toLowerCase().includes(searchTerm.toLowerCase());

    // Popular filter
    let matchesPopular = true;
    if (selectedPopular === 'owner') matchesPopular = prop.isOwnerProperty;
    else if (selectedPopular === 'verified') matchesPopular = prop.isVerified;
    else if (selectedPopular === 'furnished') matchesPopular = prop.furnishing?.includes('Fully Furnished');
    else if (selectedPopular === 'bachelor') matchesPopular = prop.isBachelorFriendly;
    else if (selectedPopular === 'immediate') matchesPopular = prop.availability?.includes('Immediately');

    // Property Type filter
    let matchesType = true;
    if (selectedType !== 'all') {
      matchesType = prop.propertyType?.toLowerCase().includes(selectedType.toLowerCase());
    }

    // Budget filter
    let matchesBudget = true;
    if (selectedBudget !== 'all') {
      const priceMatch = prop.price?.match(/[\d,]+/);
      if (priceMatch) {
        const priceNum = parseInt(priceMatch[0].replace(/,/g, ''));
        if (selectedBudget === 'under-10k') matchesBudget = priceNum < 10000;
        else if (selectedBudget === '10-15k') matchesBudget = priceNum >= 10000 && priceNum <= 15000;
        else if (selectedBudget === '15-25k') matchesBudget = priceNum >= 15000 && priceNum <= 25000;
        else if (selectedBudget === 'above-25k') matchesBudget = priceNum > 25000;
      }
    }

    return matchesSearch && matchesPopular && matchesType && matchesBudget;
  });

  // Budget options
  const budgetOptions = [
    { value: 'all', label: 'All Budgets' },
    { value: 'under-10k', label: 'Under ₹ 10,000' },
    { value: '10-15k', label: '₹ 10,000 - ₹ 15,000' },
    { value: '15-25k', label: '₹ 15,000 - ₹ 25,000' },
    { value: 'above-25k', label: 'Above ₹ 25,000' }
  ];

  // Popular choices
  const popularChoices = [
    { value: 'all', label: 'All Properties', icon: '🏠' },
    { value: 'owner', label: 'Owner Properties', icon: '🤝' },
    { value: 'verified', label: 'Verified Properties', icon: '✅' },
    { value: 'furnished', label: 'Furnished Homes', icon: '🛋️' },
    { value: 'bachelor', label: 'Bachelor Friendly', icon: '👤' },
    { value: 'immediate', label: 'Immediately Available', icon: '🚀' }
  ];

  // Property Types
  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'flat', label: 'Flat for rent' },
    { value: 'house', label: 'House for rent' },
    { value: 'villa', label: 'Villa for rent' },
    { value: 'pg', label: 'PG' },
    { value: 'office space', label: 'Office Space' },
    { value: 'commercial space', label: 'Commercial Space' },
    { value: 'student hostel', label: 'Student Hostels' }
  ];

  // Explore links
  const exploreLinks = [
    { icon: '📍', label: 'Localities', action: () => alert('Explore popular localities in Belgaum: Shahapur, Tilakwadi, Camp, RPD Cross, Gogte Chowk') },
    { icon: '📊', label: 'Buy Vs Rent', action: () => alert('Compare buying vs renting in Belgaum. Get personalized advice.') },
    { icon: '👔', label: 'Find an Agent', action: () => window.location.href = '/approved-agents' },
    { icon: '📝', label: 'Share Requirement', action: () => setShowShareRequirement(true) }
  ];

  const PropertyCard = ({ property }) => (
    <Link to={`/property/${property._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={property.images?.[0] || 'https://placehold.co/600x400/eee/ccc?text=Property'}
            alt={property.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          {property.isVerified && (
            <span style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: '#4caf50',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              ✅ Verified
            </span>
          )}
          {property.isOwnerProperty && (
            <span style={{
              position: 'absolute',
              top: '40px',
              left: '10px',
              background: '#2196f3',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              👤 Owner
            </span>
          )}
          {property.isBachelorFriendly && (
            <span style={{
              position: 'absolute',
              top: '70px',
              left: '10px',
              background: '#ff9800',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              🎓 Bachelor Friendly
            </span>
          )}
          {property.availability?.includes('Immediately') && (
            <span style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#f44336',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              🚀 Available Now
            </span>
          )}
        </div>
        <div style={{ padding: '15px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '5px' }}>{property.title}</h3>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>{property.price}</div>
          <div style={{ color: '#666', fontSize: '0.8rem' }}>📍 {property.location}, {property.area}</div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {property.bedrooms > 0 && <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>{property.bedrooms} BHK</span>}
            <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>{property.size}</span>
            <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>{property.furnishing || 'Standard'}</span>
          </div>
          <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#666' }}>{property.description}</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              alert(`📞 Contact owner for ${property.title}\n\nWe will connect you with the property owner/agent.`);
            }}
            style={{ width: '100%', marginTop: '12px', padding: '8px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            📞 Contact Owner
          </button>
        </div>
      </div>
    </Link>
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px' }}>🏠 Loading rental properties...</div>;

  return (
    <div style={{ padding: '40px 0', background: '#f5f7fb' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔑 Rent Properties in Belgaum</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Find the perfect rental home - Flats, Houses, PG, Commercial Spaces & more</p>

        {/* Search Bar */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="🔍 Search by area, location, or property name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
          />
        </div>

        {/* ===== POPULAR CHOICES ===== */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>🔥 Popular Choices</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {popularChoices.map((choice) => (
              <button
                key={choice.value}
                onClick={() => setSelectedPopular(choice.value)}
                style={{
                  padding: '10px 20px',
                  background: selectedPopular === choice.value ? '#E31B23' : 'white',
                  color: selectedPopular === choice.value ? 'white' : '#333',
                  border: selectedPopular === choice.value ? '2px solid #E31B23' : '2px solid #e0e0e0',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: selectedPopular === choice.value ? 'bold' : 'normal'
                }}
              >
                {choice.icon} {choice.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== PROPERTY TYPES ===== */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>🏠 Property Types</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                style={{
                  padding: '8px 18px',
                  background: selectedType === type.value ? '#E31B23' : 'white',
                  color: selectedType === type.value ? 'white' : '#333',
                  border: selectedType === type.value ? '2px solid #E31B23' : '2px solid #e0e0e0',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== BUDGET ===== */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>💰 Budget</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {budgetOptions.map((budget) => (
              <button
                key={budget.value}
                onClick={() => setSelectedBudget(budget.value)}
                style={{
                  padding: '10px 20px',
                  background: selectedBudget === budget.value ? '#E31B23' : 'white',
                  color: selectedBudget === budget.value ? 'white' : '#333',
                  border: selectedBudget === budget.value ? '2px solid #E31B23' : '2px solid #e0e0e0',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: selectedBudget === budget.value ? 'bold' : 'normal'
                }}
              >
                {budget.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== RESULTS COUNT ===== */}
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Showing {filteredProperties.length} rental properties
          {selectedPopular !== 'all' && ` • ${popularChoices.find(p => p.value === selectedPopular)?.label}`}
          {selectedType !== 'all' && ` • ${propertyTypes.find(t => t.value === selectedType)?.label}`}
          {selectedBudget !== 'all' && ` • ${budgetOptions.find(b => b.value === selectedBudget)?.label}`}
        </p>

        {/* ===== PROPERTY GRID ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', marginBottom: '40px' }}>
          {filteredProperties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>No rental properties found matching your criteria.</p>
            <button
              onClick={() => { setSelectedPopular('all'); setSelectedType('all'); setSelectedBudget('all'); setSearchTerm(''); }}
              style={{ marginTop: '10px', padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ===== EXPLORE SECTION ===== */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginTop: '40px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>🔍 Explore</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {exploreLinks.map((link, idx) => (
              <div
                key={idx}
                onClick={link.action}
                style={{
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  border: '1px solid #e0e0e0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2rem' }}>{link.icon}</div>
                <div style={{ fontWeight: 'bold', marginTop: '8px' }}>{link.label}</div>
                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>Click to explore →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SHARE REQUIREMENT MODAL ===== */}
      {showShareRequirement && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }} onClick={() => setShowShareRequirement(false)}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '500px',
            width: '100%'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px' }}>📝 Share Your Rental Requirement</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Tell us what you're looking for and we'll find the perfect rental for you!</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('✅ Thank you! We will find the best rental properties for you and contact you shortly.');
              setShowShareRequirement(false);
            }}>
              <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="tel" placeholder="Phone Number" required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <input type="email" placeholder="Email" required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <select required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }}>
                <option value="">Select Property Type</option>
                <option>Flat</option>
                <option>House</option>
                <option>Villa</option>
                <option>PG</option>
                <option>Office Space</option>
                <option>Commercial Space</option>
              </select>
              <select required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }}>
                <option value="">Select Budget</option>
                <option>Under ₹10,000</option>
                <option>₹10,000 - ₹15,000</option>
                <option>₹15,000 - ₹25,000</option>
                <option>Above ₹25,000</option>
              </select>
              <textarea placeholder="Additional Requirements (location, furnishing, etc.)" rows="3" style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <button type="submit" style={{ width: '100%', padding: '12px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Submit Requirement →</button>
              <button type="button" onClick={() => setShowShareRequirement(false)} style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentPage;
