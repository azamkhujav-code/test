import { useState, useRef, useEffect } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const Login = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Focus on error when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Clear any previous errors
    setError(null);
    // Simple client-side placeholder authentication
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loggedIn", "true");
    onLogin(email);
  };

  return (
    <div className="login-container">
      <form 
        className="login-form" 
        onSubmit={handleSubmit} 
        aria-labelledby="login-heading"
        noValidate
      >
        <h2 id="login-heading">Login</h2>
        
        {error && (
          <div 
            ref={errorRef}
            className="error" 
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            tabIndex={-1}
          >
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="login-email">
            Email Address
            <span aria-label="required" className="required-indicator"> *</span>
          </label>
          <input
            ref={emailInputRef}
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "login-error" : undefined}
            autoComplete="email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="login-password">
            Password
            <span aria-label="required" className="required-indicator"> *</span>
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "login-error" : undefined}
            autoComplete="current-password"
            required
          />
        </div>
        
        <button 
          type="submit"
          aria-label="Submit login form"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
