import React, { useState, useEffect } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  };

  useEffect(() => {
    const newErrors: { email?: string; password?: string } = {};

    if (email && !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password && !validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long and contain uppercase, lowercase, and numeric characters.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0 && email !== "" && password !== "");
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Simple client-side placeholder authentication
      localStorage.setItem("userEmail", email);
      localStorage.setItem("loggedIn", "true");
      onLogin(email);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} aria-label="Login form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && <div className="error">{errors.email}</div>}
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
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit" disabled={!isFormValid}>Log in</button>
      </form>
    </div>
  );
};

export default Login;
