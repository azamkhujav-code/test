import React, { useState } from 'react';
import { getCsrfToken } from '../utils/csrf';

type Props = {
  onLogin: (email: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Attempt to authenticate with anti-CSRF protection token when available
    const token = getCsrfToken();
    const payload = { email, password };
    if (token) {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) {
            // Server accepted the login (CSRF token valid)
            localStorage.setItem("userEmail", email);
            localStorage.setItem("loggedIn", "true");
            onLogin(email);
          } else {
            // Optional: show server-provided error message
            res.json().then((data) => {
              setError(data?.message ?? 'Login failed.');
            }).catch(() => {
              setError('Login failed.');
            });
          }
        })
        .catch(() => {
          // If the login endpoint is unavailable (e.g., running without a backend), fall back to local login
          localStorage.setItem("userEmail", email);
          localStorage.setItem("loggedIn", "true");
          onLogin(email);
        });
    } else {
      // No CSRF token available; perform a local placeholder login
      localStorage.setItem("userEmail", email);
      localStorage.setItem("loggedIn", "true");
      onLogin(email);
    }
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
