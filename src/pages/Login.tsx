import React, { useState } from 'react';
import { userActionMonitor, UserAction } from '../utils/monitoring';
import type { LoginMetadata, LoginFailedMetadata } from '../types/monitoring';

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
      
      // Track login failure
      const failedMetadata: LoginFailedMetadata = {
        errorCode: 'MISSING_CREDENTIALS',
        errorMessage: 'Please enter both email and password.',
      };
      userActionMonitor.track(UserAction.LOGIN_FAILED, undefined, failedMetadata);
      
      return;
    }
    
    // Simple client-side placeholder authentication
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loggedIn", "true");
    
    // Track successful login
    const loginMetadata: LoginMetadata = {
      loginMethod: 'email',
      deviceInfo: {
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                 navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                 navigator.userAgent.includes('Safari') ? 'Safari' : 'Other',
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      }
    };
    userActionMonitor.track(UserAction.LOGIN, email, loginMetadata);
    
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
