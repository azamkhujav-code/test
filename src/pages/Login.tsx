import React, { useState, useEffect } from 'react';

type Props = {
  onLogin: (email: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): string[] => {
    const errors: string[] = [];
    if (!email) {
      errors.push("Email is required");
    } else {
      // RFC 5322 compliant regex
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email)) {
        errors.push("Please enter a valid email address");
      } else {
        const [localPart, domain] = email.split('@');
        if (localPart.length > 64) {
          errors.push("The part before @ in the email is too long");
        }
        if (email.length > 254) {
          errors.push("The email address is too long");
        }
        if (domain.startsWith('-') || domain.endsWith('-')) {
          errors.push("The domain name cannot start or end with a hyphen");
        }
      }
    }
    return errors;
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (!password) {
      errors.push("Password is required");
    } else {
      if (password.length < 8) errors.push("Password must be at least 8 characters long");
      if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
      if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
      if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number");
    }
    return errors;
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailErrors = validateEmail(newEmail);
    setErrors(prev => ({ ...prev, email: emailErrors.length > 0 ? emailErrors : undefined }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
    const passwordErrors = validatePassword(newPassword);
    setErrors(prev => ({ ...prev, password: passwordErrors.length > 0 ? passwordErrors : undefined }));
  };

  useEffect(() => {
    setIsFormValid(
      email.length > 0 &&
      password.length > 0 &&
      (!errors.email || errors.email.length === 0) &&
      (!errors.password || errors.password.length === 0)
    );
  }, [email, password, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isLoading) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Simple client-side placeholder authentication
        localStorage.setItem("userEmail", email);
        localStorage.setItem("loggedIn", "true");
        onLogin(email);
      } catch (error) {
        console.error("Login failed:", error);
        setErrors(prev => ({ ...prev, form: ["Login failed. Please try again."] }));
      } finally {
        setIsLoading(false);
      }
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
            onChange={handleEmailChange}
            placeholder="you@example.com"
            className={errors.email && errors.email.length > 0 ? "input-error" : ""}
            disabled={isLoading}
          />
          {errors.email && errors.email.map((error, index) => (
            <div key={index} className="error">{error}</div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className={errors.password && errors.password.length > 0 ? "input-error" : ""}
            disabled={isLoading}
          />
          {errors.password && errors.password.map((error, index) => (
            <div key={index} className="error">{error}</div>
          ))}
          {password && (
            <div className="password-strength">
              <div className="strength-bar" style={{ width: `${(passwordStrength / 5) * 100}%` }} data-strength={passwordStrength}></div>
              <span>{getPasswordStrengthLabel(passwordStrength)}</span>
            </div>
          )}
        </div>
        <button type="submit" disabled={!isFormValid || isLoading} className={isLoading ? "loading" : ""}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        {errors.form && errors.form.map((error, index) => (
          <div key={index} className="error form-error">{error}</div>
        ))}
      </form>
    </div>
  );
};

export default Login;
