import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SellPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('owner');
  const [showPostProperty, setShowPostProperty] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAdPackages, setShowAdPackages] = useState(false);
  const [showDeveloperLounge, setShowDeveloperLounge] = useState(false);
  const [showSalesEnquiry, setShowSalesEnquiry] = useState(false);
  const [showValuation, setShowValuation] = useState(false);
  const [showRatesTrends, setShowRatesTrends] = useState(false);
  const [posting, setPosting] = useState(false);

  const API_URL = 'https://belgaum-homes-2.onrender.com';

  // Fetch properties for selling
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${API_URL}/api/properties`);
      const data = await response.json();
      setProperties(data.data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== POST PROPERTY ====================
  const handlePostProperty = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('❌ Please login first to post a property.\n\nClick "Login" in the header and try again.');
      return;
    }
    
    // Get form values
    const title = form.title.value.trim();
    const price = form.price.value.trim();
    const size = form.size.value.trim();
    const location = form.location.value.trim();
    const description = form.description.value.trim();
    const propertyType = form.propertyType.value;
    const bedrooms = parseInt(form.bedrooms.value) || 0;
    const bathrooms = parseInt(form.bathrooms.value) || 0;
    const amenities = form.amenities.value ? form.amenities.value.split(',').map(a => a.trim()).filter(a => a) : [];
    const advantages = form.advantages.value ? form.advantages.value.split(',').map(a => a.trim()).filter(a => a) : [];
    const yourName = form.yourName.value.trim();
    const phone = form.phone.value.trim();

    // Validate required fields
    if (!title || !price || !size || !location || !description || !propertyType || !yourName || !phone) {
      alert('❌ Please fill in all required fields (marked with *)');
      return;
    }

    const propertyData = {
      title: title,
      price: price,
      priceValue: parseInt(price.replace(/[^0-9]/g, '')) || 0,
      size: size,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      area: location,
      location: location,
      description: description,
      propertyType: propertyType,
      advantages: advantages,
      amenities: amenities,
      images: ['https://placehold.co/600x400/4caf50/white?text=New+Listing'],
      premium: false,
      featured: false,
      isNewLaunch: false,
      isExclusive: false,
      status: 'available',
      ownerName: yourName,
      ownerPhone: phone
    };

    setPosting(true);

    try {
      console.log('📤 Sending property data:', propertyData);
      console.log('🔑 Token present:', token ? '✅ Yes' : '❌ No');

      const response = await fetch(`${API_URL}/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });

      const data = await response.json();
      console.log('📥 Server response:', data);
      
      if (data.success) {
        alert('✅ Your property has been listed successfully! It will appear on the website shortly.');
        setShowPostProperty(false);
        form.reset();
        // Refresh properties
        setTimeout(() => {
          fetchProperties();
          window.location.reload();
        }, 1000);
      } else {
        alert('❌ Failed to list property: ' + (data.error || 'Please try again'));
      }
    } catch (error) {
      console.error('❌ Error posting property:', error);
      alert('❌ Error posting property. Please try again.\n\nError: ' + error.message);
    } finally {
      setPosting(false);
    }
  };

  // ==================== AD PACKAGES ====================
  const handleAdPackageSelect = (packageName) => {
    alert(`📢 You selected the ${packageName} package!\n\nOur team will contact you shortly.\n\n📞 For immediate assistance: +91 98765 43210`);
    setShowAdPackages(false);
  };

  // ==================== PROPERTY VALUATION ====================
  const [propertySize, setPropertySize] = useState('');
  const [propertyType, setPropertyType] = useState('apartment');
  const [location, setLocation] = useState('shahapur');
  const [valuationResult, setValuationResult] = useState(null);

  const calculateValuation = () => {
    const rates = {
      shahapur: { apartment: 5500, house: 6500, villa: 8500, plot: 12000 },
      tilakwadi: { apartment: 4500, house: 5500, villa: 7500, plot: 10000 },
      camp: { apartment: 5000, house: 6000, villa: 8000, plot: 11000 },
      rpd: { apartment: 4000, house: 5000, villa: 7000, plot: 9000 },
      gogte: { apartment: 3500, house: 4500, villa: 6500, plot: 8000 }
    };
    
    const size = parseFloat(propertySize);
    if (size && location && propertyType) {
      const rate = rates[location]?.[propertyType] || 5000;
      const value = size * rate;
      setValuationResult({
        value: value,
        rate: rate,
        size: size,
        location: location,
        type: propertyType
      });
    }
  };

  // ==================== AD PACKAGES DATA ====================
  const adPackages = [
    { 
      name: 'Basic', 
      price: '₹499', 
      duration: '30 Days',
      features: ['1 Property Listing', 'Standard Visibility', 'Email Support'],
      icon: '📋',
      popular: false
    },
    { 
      name: 'Premium', 
      price: '₹999', 
      duration: '60 Days',
      features: ['3 Property Listings', 'Featured Listing', 'Priority Support', 'WhatsApp Alerts'],
      icon: '⭐',
      popular: true
    },
    { 
      name: 'Enterprise', 
      price: '₹1,999', 
      duration: '90 Days',
      features: ['10 Property Listings', 'Top Search Results', '24/7 Support', 'Social Media Promotion', 'Email Campaign'],
      icon: '🏆',
      popular: false
    }
  ];

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>📈 Loading sell page...</div>;

  return (
    <div style={{ padding: '40px 0', background: '#f5f7fb' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📈 Sell Your Property</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Get the best value for your property in Belgaum</p>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '30px' }}>
          <button onClick={() => setActiveSection('owner')} style={{ padding: '12px 24px', background: activeSection === 'owner' ? '#E31B23' : 'white', color: activeSection === 'owner' ? 'white' : '#333', border: '2px solid #E31B23', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>👤 For Owner</button>
          <button onClick={() => setActiveSection('agent')} style={{ padding: '12px 24px', background: activeSection === 'agent' ? '#E31B23' : 'white', color: activeSection === 'agent' ? 'white' : '#333', border: '2px solid #E31B23', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🏢 For Agent & Builder</button>
          <button onClick={() => setActiveSection('tools')} style={{ padding: '12px 24px', background: activeSection === 'tools' ? '#E31B23' : 'white', color: activeSection === 'tools' ? 'white' : '#333', border: '2px solid #E31B23', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🛠️ Selling Tools</button>
        </div>

        {/* ===== FOR OWNER SECTION ===== */}
        {activeSection === 'owner' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '30px' }}>
              {/* Post Property FREE */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowPostProperty(true)}>
                <span style={{ fontSize: '3rem' }}>📝</span>
                <h3 style={{ marginTop: '15px' }}>Post Property</h3>
                <p style={{ color: '#4caf50', fontWeight: 'bold' }}>FREE</p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>List your property for free</p>
                <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Post Now →</button>
              </div>

              {/* My Dashboard */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowDashboard(true)}>
                <span style={{ fontSize: '3rem' }}>📊</span>
                <h3 style={{ marginTop: '15px' }}>My Dashboard</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Track your property listings</p>
                <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>View Dashboard →</button>
              </div>

              {/* Sell / Rent Ad Packages */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowAdPackages(true)}>
                <span style={{ fontSize: '3rem' }}>📢</span>
                <h3 style={{ marginTop: '15px' }}>Sell / Rent Ad Packages</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Get more visibility</p>
                <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>View Packages →</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== FOR AGENT & BUILDER SECTION ===== */}
        {activeSection === 'agent' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '30px' }}>
              {/* My Dashboard */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowDashboard(true)}>
                <span style={{ fontSize: '3rem' }}>📊</span>
                <h3 style={{ marginTop: '15px' }}>My Dashboard</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Track all your properties</p>
                <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Open Dashboard →</button>
              </div>

              {/* Developer Lounge */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowDeveloperLounge(true)}>
                <span style={{ fontSize: '3rem' }}>🏗️</span>
                <h3 style={{ marginTop: '15px' }}>Developer Lounge</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Exclusive tools for developers</p>
                <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Explore →</button>
              </div>

              {/* Sales Enquiry */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowSalesEnquiry(true)}>
                <span style={{ fontSize: '3rem' }}>📞</span>
                <h3 style={{ marginTop: '15px' }}>Sales Enquiry</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage buyer inquiries</p>
                <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>View Inquiries →</button>
              </div>

              {/* Ad Packages */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowAdPackages(true)}>
                <span style={{ fontSize: '3rem' }}>📢</span>
                <h3 style={{ marginTop: '15px' }}>Ad Packages</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Premium advertising options</p>
                <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>View Packages →</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== SELLING TOOLS SECTION ===== */}
        {activeSection === 'tools' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {/* Property Valuation */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowValuation(true)}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>💰</span>
                  <h3 style={{ marginTop: '15px' }}>Property Valuation</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Know your property's worth</p>
                  <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Calculate Now →</button>
                </div>
              </div>

              {/* Find an Agent */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => window.location.href = '/approved-agents'}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>👔</span>
                  <h3 style={{ marginTop: '15px' }}>Find an Agent</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Connect with top agents</p>
                  <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Find Agents →</button>
                </div>
              </div>

              {/* Rates & Trends */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setShowRatesTrends(true)}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>📈</span>
                  <h3 style={{ marginTop: '15px' }}>Rates & Trends</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Market insights for Belgaum</p>
                  <button style={{ marginTop: '15px', padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>View Trends →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ===== POST PROPERTY MODAL ===== */}
        {/* ============================================================ */}
        {showPostProperty && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setShowPostProperty(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '550px', width: '100%', maxHeight: '85vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '5px' }}>📝 Post Property</h2>
              <p style={{ color: '#4caf50', fontWeight: 'bold', marginBottom: '20px' }}>✦ FREE Listing ✦</p>
              <form onSubmit={handlePostProperty}>
                <input type="text" name="title" placeholder="Property Title *" required style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <select name="propertyType" required style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }}>
                  <option value="">Property Type *</option>
                  <option value="Apartment/Flat">Apartment/Flat</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot/Land">Plot/Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <input type="text" name="location" placeholder="Location (e.g., Shahapur) *" required style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="price" placeholder="Price (e.g., ₹85,00,000) *" required style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="size" placeholder="Area (e.g., 1500 sq ft) *" required style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="number" name="bedrooms" placeholder="Bedrooms (0 for commercial)" style={{ padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  <input type="number" name="bathrooms" placeholder="Bathrooms" style={{ padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
                <textarea name="description" placeholder="Property Description *" rows="3" required style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="amenities" placeholder="Amenities (comma separated - Gym, Pool, Security)" style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="advantages" placeholder="Advantages (comma separated - Near school, Market)" style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="yourName" placeholder="Your Name *" required style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="tel" name="phone" placeholder="Phone Number *" required style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <button type="submit" disabled={posting} style={{ width: '100%', padding: '12px', background: posting ? '#999' : '#4caf50', color: 'white', border: 'none', borderRadius: '6px', cursor: posting ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                  {posting ? '⏳ Posting...' : '📤 Post Property FREE'}
                </button>
                <button type="button" onClick={() => setShowPostProperty(false)} style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ===== DASHBOARD MODAL ===== */}
        {/* ============================================================ */}
        {showDashboard && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setShowDashboard(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px' }}>📊 My Dashboard</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>🏠</span>
                  <p style={{ fontWeight: 'bold' }}>{properties.length}</p>
                  <p style={{ color: '#666', fontSize: '0.8rem' }}>Active Listings</p>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>👀</span>
                  <p style={{ fontWeight: 'bold' }}>45</p>
                  <p style={{ color: '#666', fontSize: '0.8rem' }}>Total Views</p>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>📞</span>
                  <p style={{ fontWeight: 'bold' }}>8</p>
                  <p style={{ color: '#666', fontSize: '0.8rem' }}>Inquiries</p>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>⭐</span>
                  <p style={{ fontWeight: 'bold' }}>4.5</p>
                  <p style={{ color: '#666', fontSize: '0.8rem' }}>Rating</p>
                </div>
              </div>
              <button onClick={() => setShowDashboard(false)} style={{ width: '100%', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ===== AD PACKAGES MODAL ===== */}
        {/* ============================================================ */}
        {showAdPackages && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setShowAdPackages(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '800px', width: '100%', maxHeight: '80vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px' }}>📢 Ad Packages</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {adPackages.map((pkg, idx) => (
                  <div key={idx} style={{ background: pkg.popular ? '#fff5f0' : '#f8f9fa', padding: '20px', borderRadius: '12px', textAlign: 'center', border: pkg.popular ? '2px solid #E31B23' : '1px solid #e0e0e0' }}>
                    {pkg.popular && <div style={{ background: '#E31B23', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', display: 'inline-block', marginBottom: '10px' }}>⭐ Most Popular</div>}
                    <div style={{ fontSize: '3rem' }}>{pkg.icon}</div>
                    <h3>{pkg.name}</h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E31B23' }}>{pkg.price}</p>
                    <p style={{ color: '#666', fontSize: '0.8rem' }}>{pkg.duration}</p>
                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', margin: '15px 0' }}>
                      {pkg.features.map((feature, i) => (
                        <li key={i} style={{ padding: '5px 0', fontSize: '0.85rem', color: '#555' }}>✅ {feature}</li>
                      ))}
                    </ul>
                    <button onClick={() => handleAdPackageSelect(pkg.name)} style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Select Package →</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowAdPackages(false)} style={{ width: '100%', marginTop: '20px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ===== DEVELOPER LOUNGE MODAL ===== */}
        {/* ============================================================ */}
        {showDeveloperLounge && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setShowDeveloperLounge(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px' }}>🏗️ Developer Lounge</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <h4>📊 Project Analytics</h4>
                  <p style={{ color: '#666' }}>Track your project performance</p>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <h4>📋 Lead Management</h4>
                  <p style={{ color: '#666' }}>Manage buyer inquiries</p>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <h4>📢 Bulk Listing</h4>
                  <p style={{ color: '#666' }}>List multiple properties at once</p>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <h4>📊 Market Reports</h4>
                  <p style={{ color: '#666' }}>Access to market insights</p>
                </div>
              </div>
              <button onClick={() => setShowDeveloperLounge(false)} style={{ width: '100%', marginTop: '20px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ===== SALES ENQUIRY MODAL ===== */}
        {/* ============================================================ */}
        {showSalesEnquiry && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setShowSalesEnquiry(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px' }}>📞 Sales Enquiries</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '3px solid #ff9800' }}>
                  <p><strong>Rahul Sharma</strong></p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>📱 +91 98765 43210</p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>🏠 Interested in Shahapur property</p>
                  <p style={{ color: '#666', fontSize: '0.75rem' }}>2 hours ago</p>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '3px solid #4caf50' }}>
                  <p><strong>Priya Patel</strong></p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>📱 +91 98765 43211</p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>🏠 Looking for 3BHK in Tilakwadi</p>
                  <p style={{ color: '#666', fontSize: '0.75rem' }}>1 day ago</p>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '3px solid #2196f3' }}>
                  <p><strong>Amit Kumar</strong></p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>📱 +91 98765 43212</p>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>🏠 Wants to sell property in Camp</p>
                  <p style={{ color: '#666', fontSize: '0.75rem' }}>2 days ago</p>
                </div>
              </div>
              <button onClick={() => setShowSalesEnquiry(false)} style={{ width: '100%', marginTop: '20px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ===== PROPERTY VALUATION MODAL ===== */}
        {/* ============================================================ */}
        {showValuation && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setShowValuation(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px' }}>💰 Property Valuation</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>Get an estimated value for your property in Belgaum</p>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Property Size (sq ft)</label>
                <input type="number" value={propertySize} onChange={(e) => setPropertySize(e.target.value)} placeholder="Enter size in sq ft" style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Property Type</label>
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }}>
                  <option value="apartment">Apartment/Flat</option>
                  <option value="house">Independent House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot/Land</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '6px' }}>
                  <option value="shahapur">Shahapur</option>
                  <option value="tilakwadi">Tilakwadi</option>
                  <option value="camp">Camp Area</option>
                  <option value="rpd">RPD Cross</option>
                  <option value="gogte">Gogte Chowk</option>
                </select>
              </div>
              <button onClick={calculateValuation} style={{ width: '100%', padding: '12px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Value</button>
              {valuationResult && (
                <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
                  <h3 style={{ color: '#E31B23' }}>Estimated Property Value</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E31B23' }}>₹{valuationResult.value.toLocaleString()}</p>
                  <p style={{ color: '#666' }}>Based on {valuationResult.size} sq ft at ₹{valuationResult.rate}/sq ft</p>
                  <p style={{ color: '#666', fontSize: '0.8rem' }}>Location: {valuationResult.location.charAt(0).toUpperCase() + valuationResult.location.slice(1)}</p>
                </div>
              )}
              <button onClick={() => setShowValuation(false)} style={{ width: '100%', marginTop: '20px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ===== RATES & TRENDS MODAL ===== */}
        {/* ============================================================ */}
        {showRatesTrends && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setShowRatesTrends(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '600px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px' }}>📈 Rates & Trends - Belgaum</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#E31B23', color: 'white' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Location</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Apartment (per sq ft)</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>House (per sq ft)</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Villa (per sq ft)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}><td><strong>Shahapur</strong></td><td style={{ color: '#E31B23' }}>₹5,500</td><td style={{ color: '#E31B23' }}>₹6,500</td><td style={{ color: '#E31B23' }}>₹8,500</td></tr>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}><td><strong>Tilakwadi</strong></td><td style={{ color: '#E31B23' }}>₹4,500</td><td style={{ color: '#E31B23' }}>₹5,500</td><td style={{ color: '#E31B23' }}>₹7,500</td></tr>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}><td><strong>Camp Area</strong></td><td style={{ color: '#E31B23' }}>₹5,000</td><td style={{ color: '#E31B23' }}>₹6,000</td><td style={{ color: '#E31B23' }}>₹8,000</td></tr>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}><td><strong>RPD Cross</strong></td><td style={{ color: '#E31B23' }}>₹4,000</td><td style={{ color: '#E31B23' }}>₹5,000</td><td style={{ color: '#E31B23' }}>₹7,000</td></tr>
                    <tr><td><strong>Gogte Chowk</strong></td><td style={{ color: '#E31B23' }}>₹3,500</td><td style={{ color: '#E31B23' }}>₹4,500</td><td style={{ color: '#E31B23' }}>₹6,500</td></tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: '15px', color: '#666', fontSize: '0.8rem' }}>* Rates are indicative and subject to change</p>
              <button onClick={() => setShowRatesTrends(false)} style={{ width: '100%', marginTop: '20px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellPage;