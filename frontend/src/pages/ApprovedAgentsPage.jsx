import React, { useState } from 'react';

function ApprovedAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const agents = [
    {
      id: 1,
      name: "Suresh Realty",
      experience: "15+ years",
      rating: 4.8,
      propertiesSold: 45,
      phone: "+91 98765 43210",
      email: "suresh@belgaumhomes.com",
      location: "Shahapur, Belgaum",
      image: "👔",
      verified: true,
      specialties: ["Luxury Homes", "3BHK+ Properties", "Premium Villas"],
      languages: ["Kannada", "Hindi", "English"],
      about: "15 years of experience in Belgaum real estate. Specialized in luxury properties and premium villas in Shahapur area."
    },
    {
      id: 2,
      name: "Belgaum Properties",
      experience: "12+ years",
      rating: 4.7,
      propertiesSold: 38,
      phone: "+91 98765 43211",
      email: "info@belgaumproperties.com",
      location: "Tilakwadi, Belgaum",
      image: "👔",
      verified: true,
      specialties: ["Residential Flats", "Independent Houses", "Plots"],
      languages: ["Kannada", "Marathi", "English"],
      about: "Trusted real estate partner in Tilakwadi. Specializing in residential flats and independent houses."
    },
    {
      id: 3,
      name: "City Homes",
      experience: "10+ years",
      rating: 4.6,
      propertiesSold: 32,
      phone: "+91 98765 43212",
      email: "cityhomes@belgaumhomes.com",
      location: "Camp Area, Belgaum",
      image: "👔",
      verified: true,
      specialties: ["Budget Homes", "2BHK Apartments", "Commercial Spaces"],
      languages: ["Kannada", "Hindi", "Marathi", "English"],
      about: "10 years of serving Belgaum with affordable housing solutions. Expert in budget homes and 2BHK apartments."
    },
    {
      id: 4,
      name: "Shahapur Realty",
      experience: "8+ years",
      rating: 4.5,
      propertiesSold: 28,
      phone: "+91 98765 43213",
      email: "shahapurrealty@belgaumhomes.com",
      location: "Shahapur, Belgaum",
      image: "👔",
      verified: true,
      specialties: ["New Projects", "Under-Construction Properties", "Premium Flats"],
      languages: ["Kannada", "English"],
      about: "Specializing in new projects and under-construction properties in Shahapur and surrounding areas."
    },
    {
      id: 5,
      name: "Tilakwadi Estates",
      experience: "7+ years",
      rating: 4.4,
      propertiesSold: 25,
      phone: "+91 98765 43214",
      email: "tilakwadiestates@belgaumhomes.com",
      location: "Tilakwadi, Belgaum",
      image: "👔",
      verified: true,
      specialties: ["Family Homes", "3BHK Apartments", "Villas"],
      languages: ["Kannada", "Hindi", "English"],
      about: "Expert in family homes and 3BHK apartments in Tilakwadi. Trusted by over 25 families."
    },
    {
      id: 6,
      name: "Camp Properties",
      experience: "9+ years",
      rating: 4.6,
      propertiesSold: 30,
      phone: "+91 98765 43215",
      email: "campproperties@belgaumhomes.com",
      location: "Camp Area, Belgaum",
      image: "👔",
      verified: true,
      specialties: ["Commercial Properties", "Office Spaces", "Luxury Flats"],
      languages: ["Kannada", "English", "Hindi"],
      about: "Specialist in commercial properties and office spaces in Camp area. Also dealing in luxury flats."
    },
    {
      id: 7,
      name: "RPD Cross Realty",
      experience: "6+ years",
      rating: 4.3,
      propertiesSold: 20,
      phone: "+91 98765 43216",
      email: "rpdcross@belgaumhomes.com",
      location: "RPD Cross, Belgaum",
      image: "👔",
      verified: true,
      specialties: ["Affordable Homes", "1BHK Flats", "Budget Properties"],
      languages: ["Kannada", "Marathi"],
      about: "Focused on affordable homes and budget properties in RPD Cross and surrounding areas."
    },
    {
      id: 8,
      name: "Gogte Chowk Realty",
      experience: "5+ years",
      rating: 4.2,
      propertiesSold: 18,
      phone: "+91 98765 43217",
      email: "gogtechowk@belgaumhomes.com",
      location: "Gogte Chowk, Belgaum",
      image: "👔",
      verified: true,
      specialties: ["Student Housing", "PG Accommodations", "Budget Flats"],
      languages: ["Kannada", "Hindi", "English"],
      about: "Specializing in student housing and PG accommodations near Gogte College and educational institutions."
    }
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>⭐ Approved Agents in Belgaum</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Verified real estate professionals ready to help you find your dream home
          </p>
          <div style={{ display: 'inline-block', background: '#e8f5e9', padding: '8px 20px', borderRadius: '20px', marginTop: '10px' }}>
            <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓ {agents.length} Verified Agents</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '2rem', display: 'block' }}>🏠</span>
            <h3 style={{ color: '#E31B23' }}>236</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Total Properties Sold</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '2rem', display: 'block' }}>⭐</span>
            <h3 style={{ color: '#E31B23' }}>4.5</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Average Rating</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '2rem', display: 'block' }}>📍</span>
            <h3 style={{ color: '#E31B23' }}>8</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Locations Covered</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '2rem', display: 'block' }}>🎓</span>
            <h3 style={{ color: '#E31B23' }}>9+</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Years Avg Experience</p>
          </div>
        </div>

        {/* Agent List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
          {agents.map(agent => (
            <div key={agent.id} style={{ 
              background: 'white', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
            }}
            onClick={() => setSelectedAgent(agent)}
            >
              <div style={{ 
                background: 'linear-gradient(135deg, #E31B23 0%, #c0161e 100%)', 
                padding: '20px', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <div style={{ fontSize: '3rem' }}>{agent.image}</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{agent.name}</h3>
                  <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '0.85rem' }}>📍 {agent.location}</p>
                </div>
                <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                  ⭐ {agent.rating}
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                  <div>
                    <span style={{ color: '#666', fontSize: '0.8rem' }}>Experience</span>
                    <p style={{ fontWeight: 'bold', margin: '5px 0 0 0' }}>📅 {agent.experience}</p>
                  </div>
                  <div>
                    <span style={{ color: '#666', fontSize: '0.8rem' }}>Properties Sold</span>
                    <p style={{ fontWeight: 'bold', margin: '5px 0 0 0' }}>🏠 {agent.propertiesSold}</p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <span style={{ color: '#666', fontSize: '0.8rem' }}>Specialties</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
                    {agent.specialties.map((spec, idx) => (
                      <span key={idx} style={{ background: '#f0f0f0', padding: '4px 10px', borderRadius: '15px', fontSize: '0.75rem', color: '#666' }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <span style={{ color: '#666', fontSize: '0.8rem' }}>Languages</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
                    {agent.languages.map((lang, idx) => (
                      <span key={idx} style={{ background: '#e3f2fd', padding: '4px 10px', borderRadius: '15px', fontSize: '0.75rem', color: '#1565c0' }}>
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${agent.phone}`; }}
                    style={{ flex: 1, padding: '10px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    📞 Call Now
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); alert(`Contact ${agent.name} at ${agent.email}`); }}
                    style={{ flex: 1, padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    📧 Email
                  </button>
                </div>

                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                  <span style={{ color: '#4caf50', fontSize: '0.8rem' }}>✓ Verified Agent</span>
                  <span style={{ color: '#999', fontSize: '0.7rem', marginLeft: '10px' }}>ID: BHA-{String(agent.id).padStart(3, '0')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
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
        }} onClick={() => setSelectedAgent(null)}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '3rem' }}>{selectedAgent.image}</div>
                <h2 style={{ margin: '10px 0 5px 0' }}>{selectedAgent.name}</h2>
                <p style={{ color: '#666' }}>📍 {selectedAgent.location}</p>
              </div>
              <button onClick={() => setSelectedAgent(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
              <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>Rating</span>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0 0 0' }}>⭐ {selectedAgent.rating}/5</p>
              </div>
              <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>Experience</span>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0 0 0' }}>{selectedAgent.experience}</p>
              </div>
              <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>Properties</span>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0 0 0' }}>{selectedAgent.propertiesSold}</p>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#E31B23', marginBottom: '8px' }}>About</h4>
              <p style={{ color: '#555', lineHeight: '1.6' }}>{selectedAgent.about}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#E31B23', marginBottom: '8px' }}>Specialties</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedAgent.specialties.map((spec, idx) => (
                  <span key={idx} style={{ background: '#f0f0f0', padding: '4px 12px', borderRadius: '15px', fontSize: '0.8rem', color: '#666' }}>{spec}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#E31B23', marginBottom: '8px' }}>Contact</h4>
              <p><strong>Phone:</strong> {selectedAgent.phone}</p>
              <p><strong>Email:</strong> {selectedAgent.email}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => window.location.href = `tel:${selectedAgent.phone}`} style={{ flex: 1, padding: '12px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>📞 Call Agent</button>
              <button onClick={() => { alert(`Email sent to ${selectedAgent.email}`); }} style={{ flex: 1, padding: '12px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>📧 Send Email</button>
            </div>

            <button onClick={() => setSelectedAgent(null)} style={{ width: '100%', marginTop: '15px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApprovedAgentsPage;

