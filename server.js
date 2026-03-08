const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // TODO: Implement proper authentication logic
  if (email && password) {
    res.cookie('userEmail', email, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
});

// Logout route
app.post('/api/logout', (req, res) => {
  res.clearCookie('userEmail');
  res.json({ success: true });
});

// Check authentication status
app.get('/api/auth-status', (req, res) => {
  const userEmail = req.cookies.userEmail;
  if (userEmail) {
    res.json({ isAuthenticated: true, userEmail });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Catch-all route to return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});