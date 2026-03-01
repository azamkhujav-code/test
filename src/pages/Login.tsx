import { useState, type FormEvent } from 'react';
import { logUserAction } from '../utils/logger';

type Props = {
  onLogin: (email: string) => void;
};

const Login = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      logUserAction('Login attempt failed', 'warn', {
        reason: 'Missing credentials',
        email: email || 'not provided',
      });
      return;
    }
    // Simple client-side placeholder authentication
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loggedIn", "true");
    
    // Log successful login with sanitized email
    logUserAction('User logged in', 'info', {
      email,
      timestamp: new Date().toISOString(),
    });
    
    onLogin(email);
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
