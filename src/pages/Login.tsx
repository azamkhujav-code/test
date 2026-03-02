import React, { useState } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      // Simulate async authentication (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simple client-side placeholder authentication
      localStorage.setItem("userEmail", email);
      localStorage.setItem("loggedIn", "true");
      onLogin(email);
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="button-content">
              <span className="spinner"></span>
              Logging in...
            </span>
          ) : (
            'Log in'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
