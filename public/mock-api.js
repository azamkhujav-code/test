import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// POST /api/login - Set HttpOnly cookies
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Set HttpOnly secure cookies
  // loggedIn: HttpOnly flag prevents JavaScript access (true security)
  res.cookie('loggedIn', 'true', {
    httpOnly: true,
    secure: false, // false for development (would be true in production with HTTPS)
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
  });

  // userEmail: Regular cookie (readable by JavaScript for display purposes)
  res.cookie('userEmail', encodeURIComponent(email), {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
  });

  res.json({ success: true, email });
});

// POST /api/logout - Clear cookies
app.post('/api/logout', (req, res) => {
  res.clearCookie('loggedIn', { path: '/' });
  res.clearCookie('userEmail', { path: '/' });
  res.json({ success: true });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
