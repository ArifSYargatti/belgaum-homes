const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@belgaumhomes.com' && password === 'Admin@123') {
    return res.json({ success: true, token: 'test-token' });
  }
  res.status(400).json({ success: false, error: 'Invalid credentials' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});