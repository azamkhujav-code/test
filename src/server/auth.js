import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Parse JSON request bodies
app.use(express.json());

// Use express-session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Custom CSRF token generation
const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Custom CSRF protection middleware
const csrfProtection = (req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const csrfTokenCookie = req.cookies['XSRF-TOKEN'];
  const csrfTokenHeader = req.get('X-XSRF-TOKEN');

  if (!csrfTokenCookie || !csrfTokenHeader || csrfTokenCookie !== csrfTokenHeader) {
    return res.status(403).json({ error: 'CSRF token validation failed' });
  }

  next();
};

// Apply CSRF protection to all routes
app.use(csrfProtection);

// Middleware to set CSRF token
const setCsrfToken = (req, res, next) => {
  const csrfToken = generateCsrfToken();
  res.cookie('XSRF-TOKEN', csrfToken, { 
    httpOnly: false, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  req.csrfToken = csrfToken;
  next();
};

// Apply setCsrfToken middleware to all routes
app.use(setCsrfToken);

// Login route
app.post('/api/login', (req, res) => {
  // Implement your login logic here
  // For demonstration purposes, we'll just set a user in the session
  req.session.user = { email: req.body.email };
  res.json({ success: true, csrfToken: req.csrfToken });
});

// Logout route
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to logout' });
    }
    res.clearCookie('connect.sid');
    res.clearCookie('XSRF-TOKEN');
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// CSRF token route
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken });
});

// Example of a protected route
app.post('/api/protected-action', (req, res) => {
  // This route is protected by CSRF
  res.json({ success: true, message: 'Protected action completed successfully' });
});

export default app;