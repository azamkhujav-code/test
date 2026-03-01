import React, { useState, useRef, useEffect } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const errorId = "login-error-message";

  // Auto-focus email input on mount for better keyboard navigation
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Clear error on successful validation
    setError(null);
    // Simple client-side placeholder authentication
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loggedIn", "true");
    onLogin(email);
  };

  return (
    <div className="login-container">
      <main>
        <form 
          className="login-form" 
          onSubmit={handleSubmit} 
          aria-labelledby="login-heading"
          noValidate
        >
          <h2 id="login-heading">Login</h2>
          {error && (
            <div 
              id={errorId}
              className="error" 
              role="alert"
              aria-live="polite"
              aria-atomic="true"
            >
              {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="login-email">
              Email
              <span className="required-indicator" aria-label="required">*</span>
            </label>
            <input
              ref={emailInputRef}
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null); // Clear error on input change
              }}
              placeholder="you@example.com"
              required
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? errorId : undefined}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">
              Password
              <span className="required-indicator" aria-label="required">*</span>
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null); // Clear error on input change
              }}
              placeholder="Password"
              required
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? errorId : undefined}
              autoComplete="current-password"
            />
          </div>
          <button 
            type="submit"
            aria-label="Log in to your account"
          >
            Log in
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
