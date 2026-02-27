import { validatePassword } from '../utils/auth';

interface Props {
  password: string;
  showRequirements?: boolean;
}

/**
 * Password Strength Indicator Component
 * 
 * Displays real-time feedback on password strength and requirements.
 * Helps users create strong, secure passwords.
 */
const PasswordStrengthIndicator = ({
  password,
  showRequirements = true,
}: Props) => {
  if (!password && !showRequirements) {
    return null;
  }

  const validation = validatePassword(password);

  const getStrengthColor = () => {
    if (!password) return '#ccc';
    if (validation.isValid) return '#22c55e'; // green
    if (password.length >= 8) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getStrengthText = () => {
    if (!password) return 'Enter a password';
    if (validation.isValid) return 'Strong password';
    if (password.length >= 8) return 'Moderate password';
    return 'Weak password';
  };

  return (
    <div className="password-strength">
      <div
        className="strength-bar"
        style={{
          backgroundColor: getStrengthColor(),
          width: validation.isValid ? '100%' : password.length >= 8 ? '66%' : '33%',
        }}
      />
      <p className="strength-text" style={{ color: getStrengthColor() }}>
        {getStrengthText()}
      </p>
      {showRequirements && password && validation.errors.length > 0 && (
        <ul className="password-requirements">
          {validation.errors.map((error, index) => (
            <li key={index} className="requirement-error">
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
