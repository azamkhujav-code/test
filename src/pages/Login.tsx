import React, { useState, useEffect } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
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
    setPasswordStrength(calculatePasswordStrength(password));
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

  const getPasswordStrengthLabel = (strength: number): string => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    if (strength === 4) return "Strong";
    return "Very Strong";
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
          {password && (
            <div className="password-strength">
              <div className="strength-bar" style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
              <span>{getPasswordStrengthLabel(passwordStrength)}</span>
            </div>
          )}
        </div>
        <button type="submit" disabled={!isFormValid}>Log in</button>
      </form>
    </div>
  );
};

export default Login;
