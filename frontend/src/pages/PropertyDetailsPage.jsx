import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lead, setLead] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const API_URL = 'https://belgaum-homes-2.onrender.com';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      fetchPropertyDetails(id);
    } else {
      setError('No property ID provided');
      setLoading(false);
    }
  }, [id]);

  const fetchPropertyDetails = async (propertyId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching property with ID:', propertyId);
      
      const response = await fetch(`${API_URL}/api/properties/${propertyId}`);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.success && data.data) {
        setProperty(data.data);
        
        // Fetch similar properties
        try {
          const similarRes = await fetch(`${API_URL}/api/properties`);
          const similarData = await similarRes.json();
          if (similarData.success) {
            const similar = similarData.data
              .filter(p => p._id !== propertyId && p.area === data.data.area)
              .slice(0, 4);
            setSimilarProperties(similar);
          }
        } catch (err) {
          console.error('Error fetching similar properties:', err);
        }
      } else {
        setError(data.error || 'Property not found');
        setProperty(null);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      setError('Failed to load property details. Please try again.');
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          propertyId: property._id,
          propertyTitle: property.title
        })
      });
      if (response.ok) {
        alert('✅ Thank you! We will contact you shortly.');
        setShowInquiryForm(false);
        setLead({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('❌ Error submitting inquiry. Please try again.');
      }
    } catch (error) {
      alert('❌ Error submitting inquiry. Please try again.');
    }
  };

  const shareOnWhatsApp = () => {
    const text = `🏠 Check out this property: ${property.title}\n📍 ${property.location}, ${property.area}\n💰 ${property.price}\n\nMore details: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px' }}>🏠 Loading property details...</div>;

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#E31B23' }}>❌ {error}</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>The property you're looking for might have been removed or doesn't exist.</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 30px', background: '#E31B23', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          Go Back Home
        </Link>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#E31B23' }}>🔍 Property Not Found</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>The property you're looking for could not be found.</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 30px', background: '#E31B23', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          Browse Properties
        </Link>
      </div>
    );
  }

  const images = property.images || ['https://placehold.co/800x500/eee/ccc?text=No+Image'];

  return (
    <div style={{ background: '#f5f7fb', minHeight: '100vh', padding: '30px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#666' }}>
          <Link to="/" style={{ color: '#E31B23', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link to="/buy" style={{ color: '#E31B23', textDecoration: 'none' }}>Properties</Link>
          {' / '}
          <span>{property.title}</span>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          {/* Left Column */}
          <div>
            {/* Image Gallery */}
            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={images[currentImageIndex]}
                  alt={property.title}
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/800x500/eee/ccc?text=No+Image';
                  }}
                />
                {property.premium && (
                  <span style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    padding: '6px 15px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem'
                  }}>
                    ⭐ PREMIUM
                  </span>
                )}
                {property.isNewLaunch && (
                  <span style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#4caf50',
                    color: 'white',
                    padding: '6px 15px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem'
                  }}>
                    🚀 NEW LAUNCH
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px', padding: '15px', overflowX: 'auto' }}>
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`View ${idx + 1}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: '80px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border: currentImageIndex === idx ? '3px solid #E31B23' : '2px solid #e0e0e0'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/80x60/eee/ccc?text=No+Image';
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap' }}>
                <div>
                  <h1 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{property.title}</h1>
                  <p style={{ color: '#666' }}>📍 {property.location}, {property.area}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E31B23' }}>{property.price}</p>
                  <button
                    onClick={shareOnWhatsApp}
                    style={{ padding: '8px 16px', background: '#25D366', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    📱 Share on WhatsApp
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', margin: '20px 0', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏠</span>
                  <p style={{ fontWeight: 'bold' }}>{property.bedrooms} BHK</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>📏</span>
                  <p style={{ fontWeight: 'bold' }}>{property.size}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>🚽</span>
                  <p style={{ fontWeight: 'bold' }}>{property.bathrooms} Bathrooms</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>👁️</span>
                  <p style={{ fontWeight: 'bold' }}>{property.views || 0} Views</p>
                </div>
              </div>

              <h3 style={{ marginBottom: '10px' }}>📝 Description</h3>
              <p style={{ color: '#555', lineHeight: '1.8' }}>{property.description || 'No description available.'}</p>

              <div style={{ marginTop: '20px' }}>
                <h3 style={{ marginBottom: '10px' }}>✅ Advantages</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(property.advantages || []).map((adv, idx) => (
                    <span key={idx} style={{ background: '#e8f5e9', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
                      ✓ {adv}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <h3 style={{ marginBottom: '10px' }}>🏊 Amenities</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(property.amenities || []).map((amenity, idx) => (
                    <span key={idx} style={{ background: '#e3f2fd', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginBottom: '15px' }}>📍 Location</h3>
              <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                <MapContainer
                  center={[15.8573, 74.5047]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[15.8573, 74.5047]}>
                    <Popup>{property.title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Contact Agent Card */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'sticky', top: '20px' }}>
              <h3 style={{ marginBottom: '15px' }}>📞 Contact Agent</h3>
              <button
                onClick={() => setShowInquiryForm(true)}
                style={{ width: '100%', padding: '14px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
              >
                Send Inquiry
              </button>

              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
                <p style={{ fontSize: '0.85rem', color: '#666' }}>📞 +91 98765 43210</p>
                <p style={{ fontSize: '0.85rem', color: '#666' }}>📧 info@belgaumhomes.com</p>
              </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '15px' }}>🏠 Similar Properties</h3>
                {similarProperties.map((prop) => (
                  <Link key={prop._id} to={`/property/${prop._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: 'flex', gap: '15px', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <img src={prop.images?.[0] || 'https://placehold.co/80x80/eee/ccc?text=No+Image'} alt={prop.title} style={{ width: '80px', height: '70px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <p style={{ fontWeight: 'bold', margin: '0' }}>{prop.title}</p>
                        <p style={{ color: '#E31B23', fontWeight: 'bold', margin: '5px 0' }}>{prop.price}</p>
                        <p style={{ color: '#666', fontSize: '0.8rem', margin: '0' }}>{prop.location}, {prop.area}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
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
        }} onClick={() => setShowInquiryForm(false)}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '500px',
            width: '100%'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '5px' }}>📞 Inquire about</h2>
            <h3 style={{ color: '#E31B23', marginBottom: '20px' }}>{property.title}</h3>
            <form onSubmit={handleInquirySubmit}>
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={lead.name}
                onChange={(e) => setLead({...lead, name: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <input
                type="email"
                placeholder="Email *"
                required
                value={lead.email}
                onChange={(e) => setLead({...lead, email: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                value={lead.phone}
                onChange={(e) => setLead({...lead, phone: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                value={lead.message}
                onChange={(e) => setLead({...lead, message: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <button
                type="submit"
                style={{ width: '100%', padding: '14px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Send Inquiry →
              </button>
              <button
                type="button"
                onClick={() => setShowInquiryForm(false)}
                style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetailsPage;