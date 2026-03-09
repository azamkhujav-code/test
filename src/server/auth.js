import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = (req, res) => {
  const { email, password } = req.body;

  // TODO: Implement proper user authentication
  if (email && password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    res.json({ success: true, message: 'Logged in successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
};

export const logout = (_req, res) => {
  res.clearCookie('auth_token');
  res.json({ success: true, message: 'Logged out successfully' });
};

export const checkAuth = (req, res) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: { email: decoded.email } });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};