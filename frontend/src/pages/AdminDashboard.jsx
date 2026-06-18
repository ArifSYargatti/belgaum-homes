import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const API_URL = 'https://belgaum-homes-2.onrender.com';

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [propertiesRes, leadsRes, usersRes, agentsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/properties`),
        fetch(`${API_URL}/api/leads`),
        fetch(`${API_URL}/api/auth/users`),
        fetch(`${API_URL}/api/agents`),
        fetch(`${API_URL}/api/stats`)
      ]);

      const propertiesData = await propertiesRes.json();
      const leadsData = await leadsRes.json();
      const usersData = await usersRes.json();
      const agentsData = await agentsRes.json();
      const statsData = await statsRes.json();

      setProperties(propertiesData.data || []);
      setLeads(leadsData.data || []);
      setUsers(usersData.data || []);
      setAgents(agentsData.data || []);
      setStats(statsData.data || {});
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Handle Add/Update Property
  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const propertyData = {
      title: form.title.value,
      price: form.price.value,
      priceValue: parseInt(form.price.value.replace(/[^0-9]/g, '')),
      size: form.size.value,
      bedrooms: parseInt(form.bedrooms.value),
      bathrooms: parseInt(form.bathrooms.value),
      area: form.area.value,
      location: form.location.value,
      description: form.description.value,
      premium: form.premium.checked,
      featured: form.featured.checked,
      isNewLaunch: form.isNewLaunch.checked,
      isExclusive: form.isExclusive.checked,
      images: [form.image.value || 'https://placehold.co/600x400/eee/ccc?text=Property'],
      amenities: form.amenities.value.split(',').map(a => a.trim()),
      advantages: form.advantages.value.split(',').map(a => a.trim())
    };

    try {
      const token = localStorage.getItem('token');
      const url = editingProperty 
        ? `${API_URL}/api/properties/${editingProperty._id}`
        : `${API_URL}/api/properties`;
      const method = editingProperty ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });

      if (response.ok) {
        alert(editingProperty ? '✅ Property updated!' : '✅ Property added!');
        setShowAddProperty(false);
        setEditingProperty(null);
        fetchAllData();
      } else {
        alert('❌ Failed to save property');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error saving property');
    }
  };

  // Handle Delete Property
  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/properties/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('✅ Property deleted!');
        setShowDeleteConfirm(null);
        fetchAllData();
      } else {
        alert('❌ Failed to delete property');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error deleting property');
    }
  };

  // Handle Lead Status Update
  const updateLeadStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchAllData();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Dashboard...</div>;

  // Data for charts
  const monthlyData = [
    { month: 'Jan', leads: 12, properties: 5 },
    { month: 'Feb', leads: 19, properties: 8 },
    { month: 'Mar', leads: 25, properties: 12 },
    { month: 'Apr', leads: 18, properties: 7 },
    { month: 'May', leads: 30, properties: 15 },
    { month: 'Jun', leads: 22, properties: 10 },
  ];

  const statusData = [
    { name: 'New', value: leads.filter(l => l.status === 'new').length },
    { name: 'Contacted', value: leads.filter(l => l.status === 'contacted').length },
    { name: 'Closed', value: leads.filter(l => l.status === 'closed').length },
  ];

  const COLORS = ['#E31B23', '#ff9800', '#4caf50'];

  const roleData = [
    { name: 'Admin', value: users.filter(u => u.role === 'admin').length },
    { name: 'Agent', value: users.filter(u => u.role === 'agent').length },
    { name: 'Builder', value: users.filter(u => u.role === 'builder').length },
    { name: 'Owner', value: users.filter(u => u.role === 'owner').length },
    { name: 'Customer', value: users.filter(u => u.role === 'customer').length },
  ];

  const ROLE_COLORS = ['#E31B23', '#2196f3', '#ff9800', '#4caf50', '#9c27b0'];

  return (
    <div style={{ padding: '30px 0', background: '#f5f7fb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '5px' }}>🛠️ Admin Dashboard</h1>
            <p style={{ color: '#666' }}>Manage your Belgaum Homes platform</p>
          </div>
          <button
            onClick={() => { setShowAddProperty(true); setEditingProperty(null); }}
            style={{ padding: '12px 24px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ➕ Add Property
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>🏠 Total Properties</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E31B23' }}>{stats.totalProperties || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>📞 Total Leads</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff9800' }}>{stats.totalLeads || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>🆕 New Leads</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50' }}>{stats.newLeads || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>👥 Total Users</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196f3' }}>{stats.totalUsers || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>⭐ Agents</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9c27b0' }}>{stats.totalAgents || 0}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '30px', background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {['overview', 'properties', 'leads', 'users', 'agents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab ? '#E31B23' : 'transparent',
                color: activeTab === tab ? 'white' : '#333',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal'
              }}
            >
              {tab === 'overview' && '📊 Overview'}
              {tab === 'properties' && '🏠 Properties'}
              {tab === 'leads' && '📞 Leads'}
              {tab === 'users' && '👥 Users'}
              {tab === 'agents' && '⭐ Agents'}
            </button>
          ))}
        </div>

        {/* ========== OVERVIEW TAB ========== */}
        {activeTab === 'overview' && (
          <div>
            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '15px' }}>📊 Monthly Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="leads" stroke="#E31B23" />
                    <Line type="monotone" dataKey="properties" stroke="#2196f3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '15px' }}>📊 Lead Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '15px' }}>👥 User Roles</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ROLE_COLORS[index % ROLE_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ========== PROPERTIES TAB ========== */}
        {activeTab === 'properties' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Bedrooms</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((prop) => (
                    <tr key={prop._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px' }}>{prop.title}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#E31B23' }}>{prop.price}</td>
                      <td style={{ padding: '12px' }}>{prop.location}</td>
                      <td style={{ padding: '12px' }}>{prop.bedrooms} BHK</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button
                          onClick={() => { setEditingProperty(prop); setShowAddProperty(true); }}
                          style={{ padding: '6px 12px', background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                        >✏️ Edit</button>
                        <button
                          onClick={() => setShowDeleteConfirm(prop._id)}
                          style={{ padding: '6px 12px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {properties.length === 0 && <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No properties found</p>}
            </div>
          </div>
        )}

        {/* ========== LEADS TAB ========== */}
        {activeTab === 'leads' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Property</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px' }}>{lead.name}</td>
                      <td style={{ padding: '12px' }}>{lead.email}</td>
                      <td style={{ padding: '12px' }}>{lead.phone}</td>
                      <td style={{ padding: '12px' }}>{lead.propertyTitle || 'General'}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          background: lead.status === 'new' ? '#fce4ec' : lead.status === 'contacted' ? '#fff3e0' : '#e8f5e9',
                          color: lead.status === 'new' ? '#c62828' : lead.status === 'contacted' ? '#e65100' : '#2e7d32'
                        }}>
                          {lead.status || 'new'}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <select
                          value={lead.status || 'new'}
                          onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                          style={{ padding: '4px 8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {leads.length === 0 && <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No leads found</p>}
            </div>
          </div>
        )}

        {/* ========== USERS TAB ========== */}
        {activeTab === 'users' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Registered</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px' }}>{u.name}</td>
                      <td style={{ padding: '12px' }}>{u.email}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          background: u.role === 'admin' ? '#fce4ec' : u.role === 'agent' ? '#e3f2fd' : '#e8f5e9',
                          color: u.role === 'admin' ? '#c62828' : u.role === 'agent' ? '#0d47a1' : '#2e7d32'
                        }}>
                          {u.role || 'customer'}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px' }}>{u.verified ? '✅ Yes' : '❌ No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No users found</p>}
            </div>
          </div>
        )}

        {/* ========== AGENTS TAB ========== */}
        {activeTab === 'agents' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Experience</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Rating</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Properties</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Verified</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px' }}>{agent.name}</td>
                      <td style={{ padding: '12px' }}>{agent.experience}</td>
                      <td style={{ padding: '12px' }}>⭐ {agent.rating}</td>
                      <td style={{ padding: '12px' }}>{agent.propertiesSold}</td>
                      <td style={{ padding: '12px' }}>{agent.verified ? '✅ Yes' : '❌ No'}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button
                          style={{ padding: '6px 12px', background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => alert(`Contact: ${agent.phone}\nEmail: ${agent.email}`)}
                        >📞 View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {agents.length === 0 && <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No agents found</p>}
            </div>
          </div>
        )}

        {/* ========== ADD/EDIT PROPERTY MODAL ========== */}
        {showAddProperty && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}
            onClick={() => { setShowAddProperty(false); setEditingProperty(null); }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '600px', width: '100%', maxHeight: '80vh', overflow: 'auto' }}
              onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px' }}>{editingProperty ? '✏️ Edit Property' : '➕ Add New Property'}</h2>
              <form onSubmit={handlePropertySubmit}>
                <input type="text" name="title" placeholder="Property Title" required defaultValue={editingProperty?.title || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="price" placeholder="Price (e.g., ₹85,00,000)" required defaultValue={editingProperty?.price || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="size" placeholder="Size (e.g., 1500 sq ft)" required defaultValue={editingProperty?.size || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="number" name="bedrooms" placeholder="Bedrooms" required defaultValue={editingProperty?.bedrooms || ''} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  <input type="number" name="bathrooms" placeholder="Bathrooms" required defaultValue={editingProperty?.bathrooms || ''} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
                <input type="text" name="area" placeholder="Area (e.g., Shahapur)" required defaultValue={editingProperty?.area || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="location" placeholder="Location (e.g., Near City Center)" required defaultValue={editingProperty?.location || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <textarea name="description" placeholder="Description" rows="3" defaultValue={editingProperty?.description || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="image" placeholder="Image URL" defaultValue={editingProperty?.images?.[0] || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="amenities" placeholder="Amenities (comma separated)" defaultValue={editingProperty?.amenities?.join(', ') || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <input type="text" name="advantages" placeholder="Advantages (comma separated)" defaultValue={editingProperty?.advantages?.join(', ') || ''} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <label><input type="checkbox" name="premium" defaultChecked={editingProperty?.premium || false} /> Premium</label>
                  <label><input type="checkbox" name="featured" defaultChecked={editingProperty?.featured || false} /> Featured</label>
                  <label><input type="checkbox" name="isNewLaunch" defaultChecked={editingProperty?.isNewLaunch || false} /> New Launch</label>
                  <label><input type="checkbox" name="isExclusive" defaultChecked={editingProperty?.isExclusive || false} /> Exclusive</label>
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>{editingProperty ? '✏️ Update Property' : '➕ Add Property'}</button>
                <button type="button" onClick={() => { setShowAddProperty(false); setEditingProperty(null); }} style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* ========== DELETE CONFIRM MODAL ========== */}
        {showDeleteConfirm && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}
            onClick={() => setShowDeleteConfirm(null)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '400px', width: '100%' }}
              onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px' }}>🗑️ Confirm Delete</h2>
              <p style={{ marginBottom: '20px' }}>Are you sure you want to delete this property? This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleDeleteProperty(showDeleteConfirm)} style={{ flex: 1, padding: '10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>🗑️ Delete</button>
                <button onClick={() => setShowDeleteConfirm(null)} style={{ flex: 1, padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;