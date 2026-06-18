import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import SellPage from './pages/SellPage';
import ApprovedAgentsPage from './pages/ApprovedAgentsPage';
import HomeLoansPage from './pages/HomeLoansPage';
import HomeInteriorsPage from './pages/HomeInteriorsPage';
import './App.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f5f7fb', minHeight: '100vh' }}>
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
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px', color: 'white', cursor: 'pointer' }}>Belgaum Home Search</h1>
            </Link>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/buy" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>🏠 Buy</Link>
              <Link to="/rent" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>🔑 Rent</Link>
              <Link to="/sell" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>📈 Sell</Link>
              <Link to="/approved-agents" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>⭐ Agents</Link>
              <Link to="/home-loans" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>🏦 Home Loans</Link>
              <Link to="/home-interiors" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>🛋️ Home Interiors</Link>
              <span style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/approved-agents" element={<ApprovedAgentsPage />} />
        <Route path="/home-loans" element={<HomeLoansPage />} />
        <Route path="/home-interiors" element={<HomeInteriorsPage />} />
      </Routes>

      {/* FOOTER */}
      <footer style={{ background: '#1a1a2e', color: '#ccc', padding: '40px 0 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
            <div><h3 style={{ color: 'white', marginBottom: '15px' }}>Belgaum Home Search</h3><p>Your trusted partner in finding the perfect home.</p></div>
            <div><h4 style={{ color: 'white', marginBottom: '15px' }}>Quick Links</h4><Link to="/buy" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Buy</Link><Link to="/rent" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Rent</Link><Link to="/sell" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Sell</Link><Link to="/approved-agents" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Approved Agents</Link></div>
            <div><h4 style={{ color: 'white', marginBottom: '15px' }}>Legal</h4><a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>RERA</a><a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Stamp Duty</a></div>
            <div><h4 style={{ color: 'white', marginBottom: '15px' }}>Connect</h4><p>📞 +91 98765 43210</p><p>📧 info@belgaumhomes.com</p></div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #333' }}><p>© 2024 Belgaum Home Search. All rights reserved.</p></div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowLoginModal(false)}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <h3>🔑 Login</h3>
            <input type="email" placeholder="Email" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} />
            <input type="password" placeholder="Password" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' }} />
            <button style={{ width: '100%', padding: '10px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Login</button>
            <button onClick={() => setShowLoginModal(false)} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;