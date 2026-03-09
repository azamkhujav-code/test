import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = 3001; // Use a different port than the frontend

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));

// Mock user data (replace with actual database in production)
const users = [
  { email: 'user@example.com', password: 'password123' }
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Set HttpOnly Secure Cookie
    res.cookie('authToken', 'user-token', {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });
    res.json({ success: true, message: 'Logged in successfully' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/api/user', (req, res) => {
  const authToken = req.cookies.authToken;
  if (authToken) {
    // In a real app, you would validate the token and fetch user data
    res.json({ email: 'user@example.com' });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});