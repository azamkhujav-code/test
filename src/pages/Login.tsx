import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await login(email, password);
      // Auth context will update user state and App will re-render
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} aria-label="Login form">
        <h2>Secure Login</h2>
        <p className="security-notice">
          Authentication uses HttpOnly cookies for enhanced security
        </p>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            required
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
            disabled={loading}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
};

export default Login;
