import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import SellPage from './pages/SellPage';
import HomeLoansPage from './pages/HomeLoansPage';
import HomeInteriorsPage from './pages/HomeInteriorsPage';
import ApprovedAgentsPage from './pages/ApprovedAgentsPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const API_URL = 'https://belgaum-homes-2.onrender.com';

  // Check login status on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
        console.log(`✅ Auto-login: ${parsedUser.name} (${parsedUser.role})`);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    console.log(`✅ Logged in: ${userData.name} (${userData.role})`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    alert('✅ Logged out successfully');
    window.location.href = '/';
  };

  // Render user role badge
  const getRoleBadge = (role) => {
    const badges = {
      admin: '🛠️ Admin',
      agent: '👔 Agent',
      builder: '🏗️ Builder',
      owner: '🏡 Owner',
      customer: '🏠 Customer'
    };
    return badges[role] || '👤 User';
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f5f7fb', minHeight: '100vh' }}>
      {/* HEADER */}
      <div style={{ background: '#E31B23', color: 'white', padding: '12px 0', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.15)', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ cursor: 'pointer', fontSize: '0.9rem' }}>📍 Belgaum ▼</div>
              {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.9rem' }}>👋 Hi, {user?.name}</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
                    {getRoleBadge(user?.role)}
                  </span>
                  <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '4px' }}>
                    📊 Dashboard
                  </Link>
                  <button onClick={handleLogout} style={{ background: '#ff6b35', border: 'none', padding: '4px 12px', borderRadius: '4px', color: 'white', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Logout
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Link to="/auth" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>🔑 Login</Link>
                  <Link to="/auth" style={{ background: '#ffd700', color: '#E31B23', padding: '6px 15px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>Register</Link>
                </div>
              )}
            </div>
            <button style={{ background: '#ffd700', border: 'none', padding: '6px 15px', borderRadius: '4px', color: '#E31B23', fontWeight: '600', cursor: 'pointer' }}>Post Property</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px', color: 'white', cursor: 'pointer' }}>Belgaum Home Search</h1>
            </Link>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>🏠 Home</Link>
              <Link to="/buy" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Buy</Link>
              <Link to="/rent" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Rent</Link>
              <Link to="/sell" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Sell</Link>
              <Link to="/approved-agents" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>⭐ Agents</Link>
              <Link to="/home-loans" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>🏦 Home Loans</Link>
              <Link to="/home-interiors" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>🛋️ Interiors</Link>
              <Link to="/help" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Help</Link>
              {/* ========== ADMIN LINK ========== */}
              {user?.role === 'admin' && (
                <Link to="/admin" style={{ color: '#ffd700', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>🛠️ Admin</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========== ROUTES ========== */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/approved-agents" element={<ApprovedAgentsPage />} />
        <Route path="/home-loans" element={<HomeLoansPage />} />
        <Route path="/home-interiors" element={<HomeInteriorsPage />} />
        <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<DashboardPage user={user} />} />
        <Route path="/admin" element={<AdminDashboard user={user} />} />
        {/* ========== PROPERTY DETAILS ROUTE ========== */}
        <Route path="/property/:id" element={<PropertyDetailsPage />} />
      </Routes>

      {/* FOOTER */}
      <footer style={{ background: '#1a1a2e', color: '#ccc', padding: '40px 0 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
            <div>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>Belgaum Home Search</h3>
              <p>Your trusted partner in finding the perfect home.</p>
              {isLoggedIn && (
                <p style={{ marginTop: '10px', color: '#ffd700', fontSize: '0.85rem' }}>
                  ✅ Logged in as {user?.name} ({user?.role})
                </p>
              )}
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '15px' }}>Quick Links</h4>
              <Link to="/" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Home</Link>
              <Link to="/buy" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Buy</Link>
              <Link to="/rent" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Rent</Link>
              <Link to="/sell" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Sell</Link>
              <Link to="/approved-agents" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Agents</Link>
              <Link to="/home-loans" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Home Loans</Link>
              <Link to="/home-interiors" style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Interiors</Link>
              {isLoggedIn && (
                <Link to="/dashboard" style={{ display: 'block', color: '#ffd700', textDecoration: 'none', marginBottom: '8px' }}>📊 Dashboard</Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin" style={{ display: 'block', color: '#ffd700', textDecoration: 'none', marginBottom: '8px' }}>🛠️ Admin</Link>
              )}
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '15px' }}>Legal</h4>
              <a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>RERA</a>
              <a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Stamp Duty</a>
              <a style={{ display: 'block', color: '#ccc', textDecoration: 'none', marginBottom: '8px' }}>Property Tax</a>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '15px' }}>Connect</h4>
              <p>📞 +91 98765 43210</p>
              <p>📧 info@belgaumhomes.com</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #333' }}>
            <p>© 2024 Belgaum Home Search. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL - FALLBACK */}
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