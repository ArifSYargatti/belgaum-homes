import React from 'react';

function DashboardPage({ user }) {
  if (!user) {
    window.location.href = '/auth';
    return null;
  }

  const getDashboardContent = () => {
    switch(user.role) {
      case 'admin':
        return (
          <div>
            <h2>🛠️ Admin Dashboard</h2>
            <p>Manage users, properties, and leads</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>👥 Users: 12</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>🏠 Properties: 6</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>📞 Leads: 8</div>
            </div>
          </div>
        );
      case 'agent':
        return (
          <div>
            <h2>👔 Agent Dashboard</h2>
            <p>Manage your property listings</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>🏠 Your Listings: 5</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>👀 Views: 120</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>📞 Inquiries: 3</div>
            </div>
          </div>
        );
      case 'builder':
        return (
          <div>
            <h2>🏗️ Builder Dashboard</h2>
            <p>Manage your projects</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>🏗️ Active Projects: 3</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>🏠 Units Sold: 45</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>📞 Leads: 12</div>
            </div>
          </div>
        );
      case 'owner':
        return (
          <div>
            <h2>🏡 Owner Dashboard</h2>
            <p>Manage your properties</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>🏠 Your Properties: 2</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>👀 Views: 45</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>📞 Inquiries: 1</div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h2>🏠 Customer Dashboard</h2>
            <p>Your property search and inquiries</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>🔍 Saved Searches: 3</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>❤️ Favorites: 5</div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>📞 Inquiries: 2</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {getDashboardContent()}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
