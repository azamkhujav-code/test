import React, { useState, useEffect } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="error-message" role="alert">
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
    </svg>
    <span>{message}</span>
  </div>
);

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

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
    
    let strength = 0;
    if (password.length >= minLength) strength++;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasNonalphas) strength++;

    return {
      isValid: strength === 5,
      strength: strength,
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
    setErrors(prev => ({ ...prev, email: validateEmail(newEmail) ? undefined : "Please enter a valid email address." }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validation = validatePassword(newPassword);
    setPasswordStrength(validation.strength);
    setErrors(prev => ({ ...prev, password: validation.isValid ? undefined : validation.message }));
  };

  useEffect(() => {
    if (email) {
      setErrors(prev => ({ ...prev, email: validateEmail(email) ? undefined : "Please enter a valid email address." }));
    }
    if (password) {
      const validation = validatePassword(password);
      setPasswordStrength(validation.strength);
      setErrors(prev => ({ ...prev, password: validation.isValid ? undefined : validation.message }));
    }
  }, [email, password]);

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
          {errors.email && <ErrorMessage message={errors.email} />}
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
          {errors.password && <ErrorMessage message={errors.password} />}
          <div className="password-strength-meter">
            <div className={`strength-bar strength-${passwordStrength}`}></div>
          </div>
          <div className="password-strength-text">
            {passwordStrength === 0 && "Very weak"}
            {passwordStrength === 1 && "Weak"}
            {passwordStrength === 2 && "Fair"}
            {passwordStrength === 3 && "Good"}
            {passwordStrength === 4 && "Strong"}
            {passwordStrength === 5 && "Very strong"}
          </div>
        </div>
        <button type="submit" disabled={!validateEmail(email) || passwordStrength < 5}>Log in</button>
      </form>
    </div>
  );
};

export default Login;
