import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import { randomBytes } from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

// Generate a secure session secret (in production, use environment variable)
const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString('hex');

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration - allow credentials
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite dev server
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-CSRF-Token']
}));

// Session configuration with HttpOnly cookies
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,  // Prevents JavaScript access
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  name: 'sessionId', // Custom name instead of default 'connect.sid'
}));

// Extend session type
declare module 'express-session' {
  interface SessionData {
    user?: {
      email: string;
      authenticatedAt: number;
    };
    csrfToken?: string;
  }
}

// Generate CSRF token
function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

// CSRF token validation middleware
const validateCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-csrf-token'] as string;
  const sessionToken = req.session.csrfToken;

  if (!token || !sessionToken || token !== sessionToken) {
    return res.status(403).json({ 
      success: false, 
      error: 'Invalid CSRF token' 
    });
  }

  next();
};

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get CSRF token endpoint
app.get('/api/auth/csrf-token', (req: Request, res: Response) => {
  const csrfToken = generateCsrfToken();
  req.session.csrfToken = csrfToken;
  
  res.json({ 
    success: true, 
    csrfToken 
  });
});

// Login endpoint
app.post('/api/auth/login', validateCsrfToken, (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required'
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }

  // In a real application, verify credentials against database
  // For demo purposes, accept any non-empty credentials
  if (password.length < 1) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  // Create session
  req.session.user = {
    email,
    authenticatedAt: Date.now()
  };

  // Regenerate session ID to prevent session fixation attacks
  req.session.regenerate((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create session'
      });
    }

    // Generate new CSRF token for the authenticated session
    const newCsrfToken = generateCsrfToken();
    req.session.csrfToken = newCsrfToken;

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Failed to save session'
        });
      }

      res.json({
        success: true,
        user: {
          email: req.session.user!.email
        },
        csrfToken: newCsrfToken
      });
    });
  });
});

// Verify session endpoint (check if user is authenticated)
app.get('/api/auth/verify', (req: Request, res: Response) => {
  if (req.session.user) {
    res.json({
      success: true,
      authenticated: true,
      user: {
        email: req.session.user.email
      }
    });
  } else {
    res.json({
      success: true,
      authenticated: false
    });
  }
});

// Logout endpoint
app.post('/api/auth/logout', validateCsrfToken, (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Failed to logout'
      });
    }

    // Clear the session cookie
    res.clearCookie('sessionId');
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
});

// Protected route example
app.get('/api/protected', (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      error: 'Not authenticated'
    });
  }

  res.json({
    success: true,
    message: 'This is protected data',
    user: req.session.user.email
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Authentication server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Session secret: ${SESSION_SECRET.substring(0, 10)}...`);
});

export default app;
