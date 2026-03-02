import React, { useState, useRef, useEffect } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // Focus on email input when component mounts for better accessibility
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Announce errors to screen readers when they appear
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simple client-side placeholder authentication
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loggedIn", "true");
    onLogin(email);
    
    setIsSubmitting(false);
  };

  return (
    <div className="login-container">
      <main 
        className="login-form" 
        role="main" 
        aria-labelledby="login-heading"
      >
        <form 
          onSubmit={handleSubmit} 
          aria-describedby={error ? "login-error" : undefined}
          noValidate
        >
          <h2 id="login-heading">Login</h2>
          {error && (
            <div 
              id="login-error"
              className="error" 
              role="alert" 
              aria-live="assertive"
              aria-atomic="true"
              ref={errorRef}
              tabIndex={-1}
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
                if (error) setError(null);
              }}
              placeholder="you@example.com"
              required
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "login-error" : undefined}
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
                if (error) setError(null);
              }}
              placeholder="Password"
              required
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "login-error" : undefined}
              autoComplete="current-password"
            />
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
