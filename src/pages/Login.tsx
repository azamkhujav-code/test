import React, { useState } from 'react';
import { validateEmail, validatePassword, sanitizeInput } from '../utils/validation';

type Props = {
  onLogin: (email: string) => void;
};

interface FieldErrors {
  email?: string;
  password?: string;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Validate on change if field has been touched
    if (touched.email) {
      const result = validateEmail(value);
      setFieldErrors((prev) => ({
        ...prev,
        email: result.isValid ? undefined : result.error,
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    // Validate on change if field has been touched
    if (touched.password) {
      const result = validatePassword(value);
      setFieldErrors((prev) => ({
        ...prev,
        password: result.isValid ? undefined : result.error,
      }));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    const result = validateEmail(email);
    setFieldErrors((prev) => ({
      ...prev,
      email: result.isValid ? undefined : result.error,
    }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    const result = validatePassword(password);
    setFieldErrors((prev) => ({
      ...prev,
      password: result.isValid ? undefined : result.error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    // Validate all fields
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    const errors: FieldErrors = {};
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
    }
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error;
    }
    
    setFieldErrors(errors);
    
    // Stop if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    // Sanitize inputs before storing (defense in depth)
    const sanitizedEmail = sanitizeInput(email);
    
    // Simple client-side placeholder authentication
    localStorage.setItem("userEmail", sanitizedEmail);
    localStorage.setItem("loggedIn", "true");
    onLogin(sanitizedEmail);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} aria-label="Login form" noValidate>
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="you@example.com"
            aria-invalid={touched.email && !!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={touched.email && fieldErrors.email ? "input-error" : ""}
          />
          {touched.email && fieldErrors.email && (
            <div id="email-error" className="field-error" role="alert">
              {fieldErrors.email}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            placeholder="Password"
            aria-invalid={touched.password && !!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
            className={touched.password && fieldErrors.password ? "input-error" : ""}
          />
          {touched.password && fieldErrors.password && (
            <div id="password-error" className="field-error" role="alert">
              {fieldErrors.password}
            </div>
          )}
        </div>
        
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
