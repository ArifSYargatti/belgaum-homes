const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Simple test login - NO DATABASE REQUIRED
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;
  
  if (email === 'admin@belgaumhomes.com' && password === 'Admin@123') {
    return res.json({
      success: true,
      token: 'test-token-12345',
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@belgaumhomes.com',
        role: 'admin'
      }
    });
  }
  
  return res.status(400).json({ success: false, error: 'Invalid credentials' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Test server running' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Test API is running' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Test server running on port ${PORT}`);
});