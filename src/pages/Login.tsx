import React, { useState } from 'react';
import { authenticateUser } from '../services/authService';
import { validateEmail } from '../utils/auth';

type Props = {
  onLogin: (email: string) => void;
};

/**
 * Secure Login Component
 * 
 * SECURITY IMPROVEMENTS:
 * - Passwords are never stored in plain text
 * - Authentication uses bcrypt password hashing
 * - Secure token-based session management
 * - Email validation before submission
 * - Generic error messages to prevent user enumeration
 * - Password input is properly masked
 */
const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      // SECURITY: Authenticate using secure password hashing
      // The password is sent to the authentication service where it's
      // compared against the stored bcrypt hash. The plain text password
      // is never stored or logged.
      const result = await authenticateUser(email, password);

      if (result.success && result.email) {
        // Clear password from memory
        setPassword('');
        
        // Notify parent component of successful login
        onLogin(result.email);
      } else {
        setError(result.error || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} aria-label="Login form">
        <h2>Secure Login</h2>
        
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        <div className="info-box">
          <p>Test credentials:</p>
          <ul>
            <li>demo@example.com / Demo123!</li>
            <li>test@example.com / Test456!</li>
            <li>admin@example.com / Admin789!</li>
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>

        <div className="security-note">
          <small>
            Your password is securely hashed and never stored in plain text.
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;
