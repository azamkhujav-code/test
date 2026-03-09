import React, { useState, useEffect } from 'react';
import { setCSRFToken, getCSRFToken } from '../utils/csrfUtils';

type Props = {
  onLogin: (email: string, csrfToken: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getCSRFToken() || setCSRFToken();
    setCsrfToken(token);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!csrfToken) {
      setError("CSRF token is missing. Please try again.");
      return;
    }
    // Simple client-side placeholder authentication
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loggedIn", "true");
    onLogin(email, csrfToken);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} aria-label="Login form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
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
          />
        </div>
        <input type="hidden" name="_csrf" value={csrfToken || ''} />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
