import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:5173', // Update this to match your Vite dev server port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // In a real application, you would validate the credentials here
  // For this example, we'll just check if both email and password are provided
  if (email && password) {
    res.cookie('authToken', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only use secure in production
      sameSite: 'lax', // This is more permissive for development
      maxAge: 3600000 // 1 hour
    });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ success: true });
});

app.get('/api/user', (req, res) => {
  const authToken = req.cookies.authToken;
  if (authToken) {
    res.json({ email: authToken });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});