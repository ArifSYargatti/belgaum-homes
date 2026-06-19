import React, { useState } from 'react';

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer',
    company: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'https://belgaum-homes-2.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
        alert(`✅ ${isLogin ? 'Logged in' : 'Registered'} successfully as ${data.user.role}!`);
        window.location.href = '/';
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'customer', label: '🏠 Customer / Home Buyer' },
    { value: 'owner', label: '🏡 Property Owner' },
    { value: 'agent', label: '👔 Real Estate Agent' },
    { value: 'builder', label: '🏗️ Builder / Developer' },
    { value: 'admin', label: '🛠️ Administrator' }
  ];

  return (
    <div style={{ padding: '40px 0', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', maxWidth: '500px', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '10px' }}>
          {isLogin ? '🔑 Welcome Back' : '📝 Create Account'}
        </h1>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '30px' }}>
          {isLogin ? 'Login to your Belgaum Homes account' : 'Join Belgaum\'s largest property platform'}
        </p>

        {error && (
          <div style={{ background: '#fce4ec', padding: '12px', borderRadius: '8px', color: '#c62828', marginBottom: '20px' }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
              >
                {roleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </>
          )}

          <input
            type="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
          />

          {!isLogin && (
            <input
              type="tel"
              placeholder="Phone Number *"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          )}

          <input
            type="password"
            placeholder="Password *"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
          />

          {!isLogin && formData.role === 'agent' && (
            <input
              type="text"
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          )}

          {!isLogin && ['agent', 'builder'].includes(formData.role) && (
            <input
              type="text"
              placeholder="Location / Area"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#E31B23',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#E31B23', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;

