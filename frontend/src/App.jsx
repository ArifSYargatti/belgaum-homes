import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [properties, setProperties] = useState([]);
  const [popularProperties, setPopularProperties] = useState([]);
  const [exclusiveOffers, setExclusiveOffers] = useState([]);
  const [newLaunches, setNewLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [lead, setLead] = useState({ name: '', email: '', phone: '', message: '' });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [showPrepaymentModal, setShowPrepaymentModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    type: 'buy',
    location: 'Belgaum',
    propertyType: 'residential',
    bhk: 'all',
    budget: 'all'
  });

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, popularRes, exclusiveRes, newRes] = await Promise.all([
          fetch('https://belgaum-homes-api.onrender.com/api/properties'),
          fetch('https://belgaum-homes-api.onrender.com/api/properties/popular'),
          fetch('https://belgaum-homes-api.onrender.com/api/properties/exclusive'),
          fetch('https://belgaum-homes-api.onrender.com/api/properties/new-launches')
        ]);
        
        const allData = await allRes.json();
        const popularData = await popularRes.json();
        const exclusiveData = await exclusiveRes.json();
        const newData = await newRes.json();
        
        setProperties(allData.data || []);
        setPopularProperties(popularData.data || []);
        setExclusiveOffers(exclusiveData.data || []);
        setNewLaunches(newData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const handleInquiry = (property) => {
    setSelectedProperty(property);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://belgaum-homes-api.onrender.com/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...lead, 
          propertyId: selectedProperty?._id,
          propertyTitle: selectedProperty?.title 
        })
      });
      alert('✅ Thank you! We will contact you shortly.');
      setShowForm(false);
      setLead({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      alert('❌ Error submitting. Please try again.');
    }
  };

  const banks = [
    { name: 'SBI', rate: 7.25, icon: '🏦' },
    { name: 'HDFC', rate: 7.30, icon: '🏦' },
    { name: 'ICICI', rate: 7.10, icon: '🏦' },
    { name: 'Axis', rate: 7.35, icon: '🏦' },
    { name: 'Kotak', rate: 7.40, icon: '🏦' },
    { name: 'PNB', rate: 7.28, icon: '🏦' },
  ];

  const quickLinks = [
    { name: 'Govt Portal', icon: '🏛️', link: '#' },
    { name: 'Home Décor', icon: '🛋️', link: '#' },
    { name: 'Land Record', icon: '📜', link: 'https://landrecords.karnataka.gov.in' },
    { name: 'Housing Scheme', icon: '🏠', link: '#' },
    { name: 'RERA', icon: '✅', link: 'https://rera.karnataka.gov.in' },
    { name: 'Stamp Duty', icon: '📜', link: '#' },
    { name: 'PMAY', icon: '🏠', link: 'https://pmay-urban.gov.in' },
    { name: 'Property Tax', icon: '💰', link: 'https://bbmp.gov.in' },
    { name: 'Interior Visual', icon: '🎨', link: '#' },
  ];

  const preferredAgents = [
    { name: 'Suresh Realty', experience: '15+ years', rating: 4.8, properties: 45, phone: '+91 98765 43210', image: '👔', verified: true },
    { name: 'Belgaum Properties', experience: '12+ years', rating: 4.7, properties: 38, phone: '+91 98765 43211', image: '👔', verified: true },
    { name: 'City Homes', experience: '10+ years', rating: 4.6, properties: 32, phone: '+91 98765 43212', image: '👔', verified: true },
    { name: 'Shahapur Realty', experience: '8+ years', rating: 4.5, properties: 28, phone: '+91 98765 43213', image: '👔', verified: true },
  ];

  const interiorOptions = [
    { name: 'Modern Kitchen', price: '₹1.5L - ₹3L', style: 'Modern', image: '🍳' },
    { name: 'Living Room', price: '₹2L - ₹5L', style: 'Luxury', image: '🛋️' },
    { name: 'Bedroom', price: '₹1L - ₹2.5L', style: 'Classic', image: '🛏️' },
    { name: 'Bathroom', price: '₹80k - ₹1.5L', style: 'Contemporary', image: '🚿' },
    { name: 'Modular Furniture', price: '₹1L - ₹4L', style: 'Modern', image: '📦' },
    { name: 'False Ceiling', price: '₹50k - ₹1.2L', style: 'Designer', image: '💡' },
  ];

  const areaUnits = [
    { from: 'Sq Feet', to: 'Sq Meter', formula: 'Divide by 10.764' },
    { from: 'Sq Meter', to: 'Sq Feet', formula: 'Multiply by 10.764' },
    { from: 'Hectare', to: 'Acre', formula: 'Multiply by 2.471' },
    { from: 'Acre', to: 'Hectare', formula: 'Divide by 2.471' },
    { from: 'Sq Feet', to: 'Sq Yard', formula: 'Divide by 9' },
    { from: 'Sq Yard', to: 'Sq Feet', formula: 'Multiply by 9' },
  ];

  const PropertyCard = ({ property, showBadge = false, badgeText = '', badgeColor = '#E31B23' }) => (
    <div style={{ minWidth: '320px', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' }}>
      <img src={property.images?.[0] || 'https://placehold.co/600x400/eee/ccc?text=Property'} alt={property.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '15px' }}>
        {showBadge && <div style={{ background: badgeColor, color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '0.7rem', display: 'inline-block', marginBottom: '10px' }}>{badgeText}</div>}
        <h3 style={{ fontSize: '1rem', marginBottom: '5px' }}>{property.title}</h3>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E31B23' }}>{property.price}</div>
        <div style={{ color: '#666', fontSize: '0.8rem' }}>📍 {property.location}, {property.area}</div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>{property.bedrooms} BHK</span>
          <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>{property.size}</span>
        </div>
        <button onClick={() => handleInquiry(property)} style={{ width: '100%', marginTop: '12px', padding: '8px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Inquire Now</button>
      </div>
    </div>
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px' }}>🏢 Loading Belgaum properties...</div>;

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f5f7fb' }}>
      {/* HEADER */}
      <div style={{ background: '#E31B23', color: 'white', padding: '12px 0', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.15)', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ cursor: 'pointer', fontSize: '0.9rem' }}>📍 Belgaum ▼</div>
              <div style={{ cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => setShowLoginModal(true)}>🔑 Login</div>
            </div>
            <button style={{ background: '#ffd700', border: 'none', padding: '6px 15px', borderRadius: '4px', color: '#E31B23', fontWeight: '600', cursor: 'pointer' }}>Post Property</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <h1 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px', color: 'white' }}>Belgaum Home Search</h1>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Buy</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Rent</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Sell</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Home Loans</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Home Interiors</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div style={{ background: 'white', padding: '20px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <select style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '150px' }}><option>Buy</option><option>Rent</option></select>
            <select style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '150px' }}><option>Belgaum</option><option>Shahapur</option><option>Tilakwadi</option><option>Camp</option></select>
            <select style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '150px' }}><option>Residential</option><option>Commercial</option><option>Plot</option></select>
            <select style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '150px' }}><option>All BHK</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4+ BHK</option></select>
            <select style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '150px' }}><option>All Budget</option><option>Below ₹50L</option><option>₹50L-1Cr</option><option>Above ₹1Cr</option></select>
            <button style={{ padding: '12px 30px', background: '#E31B23', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>🔍 Search</button>
          </div>
        </div>
      </div>

      {/* POPULAR PROPERTIES */}
      <div style={{ padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>🏠 Popular Properties</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '15px', scrollbarWidth: 'thin' }}>
            {popularProperties.map(property => <PropertyCard key={property._id} property={property} />)}
          </div>
        </div>
      </div>

      {/* EXCLUSIVE OFFERS */}
      <div style={{ background: '#fff5f0', padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>✨ Exclusive Property Offers</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '15px', scrollbarWidth: 'thin' }}>
            {exclusiveOffers.map(property => <PropertyCard key={property._id} property={property} showBadge badgeText="Exclusive Offer" />)}
          </div>
        </div>
      </div>

      {/* NEW LAUNCH */}
      <div style={{ padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>🚀 NEW LAUNCH</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '15px', scrollbarWidth: 'thin' }}>
            {newLaunches.map(property => <PropertyCard key={property._id} property={property} showBadge badgeText="New Launch" badgeColor="#4caf50" />)}
          </div>
        </div>
      </div>

      {/* HOME LOANS SECTION */}
      <div style={{ background: '#f0f4ff', padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🏦 Home Loans</h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>Compare & choose the best home loan for you</p>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Quick Links</h3>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '15px', paddingBottom: '10px' }}>
              <button onClick={() => setShowLoanModal(true)} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', whiteSpace: 'nowrap' }}>🏦 Home Loan by Banks</button>
              <button onClick={() => setShowLoanModal(true)} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', whiteSpace: 'nowrap' }}>📊 Home Loan by Interest</button>
              <button onClick={() => setShowEMIModal(true)} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', whiteSpace: 'nowrap' }}>💰 EMI Calculator</button>
              <button onClick={() => setShowEligibilityModal(true)} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', whiteSpace: 'nowrap' }}>✅ Eligibility Check</button>
              <button onClick={() => setShowPrepaymentModal(true)} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', whiteSpace: 'nowrap' }}>📉 Prepayment</button>
            </div>
          </div>

          <div style={{ display: 'flex', overflowX: 'auto', gap: '15px', paddingBottom: '10px' }}>
            {banks.map((bank, idx) => (
              <div key={idx} style={{ minWidth: '150px', background: 'white', padding: '15px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} onClick={() => setShowLoanModal(true)}>
                <div style={{ fontSize: '2rem' }}>{bank.icon}</div>
                <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{bank.name}</div>
                <div style={{ color: '#E31B23', fontWeight: 'bold' }}>{bank.rate}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECOMMENDED FOR YOU */}
      <div style={{ padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>📌 Recommended for You</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '15px', paddingBottom: '15px', scrollbarWidth: 'thin' }}>
            {quickLinks.map((link, idx) => (
              <a key={idx} href={link.link} target="_blank" rel="noopener noreferrer" style={{ minWidth: '140px', background: '#f8f9fa', padding: '15px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', color: '#333' }}>
                <div style={{ fontSize: '2rem' }}>{link.icon}</div>
                <div style={{ fontWeight: '500', marginTop: '8px', fontSize: '0.85rem' }}>{link.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* PREFERRED AGENTS */}
      <div style={{ background: '#f8f9fa', padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>⭐ Preferred Agents in Belgaum</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '15px', scrollbarWidth: 'thin' }}>
            {preferredAgents.map((agent, idx) => (
              <div key={idx} style={{ minWidth: '260px', background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '3rem' }}>{agent.image}</div>
                <h4 style={{ marginTop: '10px', marginBottom: '5px' }}>{agent.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>📅 {agent.experience}</p>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>⭐ {agent.rating}/5</p>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>🏠 {agent.properties} Properties</p>
                {agent.verified && <span style={{ display: 'inline-block', background: '#4caf50', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', marginTop: '5px' }}>✓ Verified</span>}
                <button onClick={() => alert(`Contact ${agent.name} at ${agent.phone}`)} style={{ width: '100%', marginTop: '15px', padding: '8px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Contact Agent</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BH INTERIORS */}
      <div style={{ padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>🏠 BH Interiors - Belgaum's Best</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '15px', scrollbarWidth: 'thin' }}>
            {interiorOptions.map((item, idx) => (
              <div key={idx} style={{ minWidth: '240px', background: '#fff8f0', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', border: '1px solid #ffe0b2' }}>
                <div style={{ fontSize: '2.5rem' }}>{item.image}</div>
                <h4 style={{ marginTop: '10px' }}>{item.name}</h4>
                <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#E31B23' }}>{item.price}</p>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>Style: {item.style}</p>
                <button style={{ marginTop: '10px', padding: '6px 15px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Get Quote</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AREA CALCULATOR */}
      <div style={{ background: '#e8f5e9', padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>📐 Area Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '15px' }}>Convert Units</h3>
              <input type="number" id="areaValue" placeholder="Enter value" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
              <select id="fromUnit" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
                <option value="sqft">Sq Feet</option><option value="sqm">Sq Meter</option><option value="acre">Acre</option><option value="hectare">Hectare</option>
              </select>
              <select id="toUnit" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
                <option value="sqm">Sq Meter</option><option value="sqft">Sq Feet</option><option value="acre">Acre</option><option value="hectare">Hectare</option>
              </select>
              <button onClick={() => {
                const value = parseFloat(document.getElementById('areaValue').value) || 0;
                const from = document.getElementById('fromUnit').value;
                const to = document.getElementById('toUnit').value;
                let result = value;
                if (from === 'sqft' && to === 'sqm') result = value / 10.764;
                else if (from === 'sqm' && to === 'sqft') result = value * 10.764;
                else if (from === 'acre' && to === 'sqft') result = value * 43560;
                else if (from === 'sqft' && to === 'acre') result = value / 43560;
                else if (from === 'hectare' && to === 'acre') result = value * 2.471;
                else if (from === 'acre' && to === 'hectare') result = value / 2.471;
                alert(`Converted Value: ${result.toFixed(4)}`);
              }} style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Convert</button>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '15px' }}>Popular Conversions</h3>
              {areaUnits.map((unit, idx) => (
                <div key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{unit.from} → {unit.to}</strong>
                  <span style={{ float: 'right', color: '#666', fontSize: '0.8rem' }}>{unit.formula}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#1a1a2e', color: '#ccc', padding: '40px 0 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
            <div><h3 style={{ color: 'white', marginBottom: '15px' }}>Belgaum Home Search</h3><p>Your trusted partner in finding the perfect home.</p></div>
            <div><h4 style={{ color: 'white', marginBottom: '15px' }}>Quick Links</h4><a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>About Us</a><a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Contact Us</a></div>
            <div><h4 style={{ color: 'white', marginBottom: '15px' }}>Legal</h4><a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>RERA</a><a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Stamp Duty</a></div>
            <div><h4 style={{ color: 'white', marginBottom: '15px' }}>Connect</h4><p>📞 +91 98765 43210</p><p>📧 info@belgaumhomes.com</p></div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #333' }}><p>© 2024 Belgaum Home Search. All rights reserved.</p></div>
        </div>
      </footer>

      {/* MODALS */}
      {showEMIModal && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowEMIModal(false)}><div style={{ background: 'white', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '450px' }} onClick={(e) => e.stopPropagation()}><h3>💰 EMI Calculator</h3><input type="number" id="amount" placeholder="Loan Amount" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><input type="number" id="rate" placeholder="Interest Rate (%)" defaultValue="8.5" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><input type="number" id="tenure" placeholder="Tenure (Years)" defaultValue="20" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><button onClick={() => { const a = parseFloat(document.getElementById('amount').value) || 0; const r = parseFloat(document.getElementById('rate').value) || 0; const t = parseFloat(document.getElementById('tenure').value) || 0; alert(`EMI: ₹${calculateEMI(a, r, t).toLocaleString()}`); }} style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Calculate</button><button onClick={() => setShowEMIModal(false)} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button></div></div>)}

      {showLoanModal && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowLoanModal(false)}><div style={{ background: 'white', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}><h3>🏦 Home Loan Comparison</h3><table style={{ width: '100%', borderCollapse: 'collapse', margin: '15px 0' }}><thead><tr><th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Bank</th><th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Rate</th><th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>EMI (₹50L, 20yrs)</th></tr></thead><tbody>{banks.map((b,i)=>(<tr key={i}><td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}><strong>{b.name}</strong></td><td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{b.rate}%</td><td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>₹{calculateEMI(5000000, b.rate, 20).toLocaleString()}</td></tr>))}</tbody></table><button onClick={() => setShowLoanModal(false)} style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button></div></div>)}

      {showEligibilityModal && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowEligibilityModal(false)}><div style={{ background: 'white', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}><h3>✅ Loan Eligibility</h3><input type="number" id="income" placeholder="Monthly Income" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><button onClick={() => { const income = parseFloat(document.getElementById('income').value) || 0; alert(`You may be eligible for loan up to: ₹${(income * 0.4 * 166).toLocaleString()}`); }} style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Check</button><button onClick={() => setShowEligibilityModal(false)} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button></div></div>)}

      {showPrepaymentModal && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowPrepaymentModal(false)}><div style={{ background: 'white', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}><h3>📉 Prepayment Calculator</h3><input type="number" id="loanAmt" placeholder="Loan Amount" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><input type="number" id="prepay" placeholder="Prepayment Amount" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><button onClick={() => { const amt = parseFloat(document.getElementById('loanAmt').value) || 0; const prepay = parseFloat(document.getElementById('prepay').value) || 0; alert(`You will save approximately: ₹${(prepay * 0.085 * 20).toLocaleString()} in interest`); }} style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Calculate</button><button onClick={() => setShowPrepaymentModal(false)} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button></div></div>)}

      {showLoginModal && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowLoginModal(false)}><div style={{ background: 'white', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}><h3>🔑 Login</h3><input type="email" placeholder="Email" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><input type="password" placeholder="Password" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><button style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Login</button><button onClick={() => setShowLoginModal(false)} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button></div></div>)}

      {showForm && selectedProperty && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowForm(false)}><div style={{ background: 'white', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '450px' }} onClick={(e) => e.stopPropagation()}><h3>📞 Contact Agent - {selectedProperty.title}</h3><input type="text" placeholder="Name" value={lead.name} onChange={e => setLead({...lead, name: e.target.value})} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><input type="email" placeholder="Email" value={lead.email} onChange={e => setLead({...lead, email: e.target.value})} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><input type="tel" placeholder="Phone" value={lead.phone} onChange={e => setLead({...lead, phone: e.target.value})} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><textarea placeholder="Message" rows="3" value={lead.message} onChange={e => setLead({...lead, message: e.target.value})} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} /><button onClick={handleSubmit} style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Send</button><button onClick={() => setShowForm(false)} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button></div></div>)}
    </div>
  );
}

export default App;