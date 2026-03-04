import React, { useState } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas,
      message: password.length < minLength
        ? `Password must be at least ${minLength} characters long.`
        : !hasUpperCase
        ? "Password must contain at least one uppercase letter."
        : !hasLowerCase
        ? "Password must contain at least one lowercase letter."
        : !hasNumbers
        ? "Password must contain at least one number."
        : !hasNonalphas
        ? "Password must contain at least one special character."
        : ""
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const passwordValidation = validatePassword(password);
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simple client-side placeholder authentication
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loggedIn", "true");
    onLogin(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(newEmail) ? undefined : "Please enter a valid email address." }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (errors.password) {
      const validation = validatePassword(newPassword);
      setErrors(prev => ({ ...prev, password: validation.isValid ? undefined : validation.message }));
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
            onChange={handleEmailChange}
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
