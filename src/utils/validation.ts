/**
 * Validation utilities for login form inputs
 * Provides email and password validation with security best practices
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates email format according to RFC 5322 standards
 * Prevents common injection attacks by sanitizing input
 * @param email - Email address to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validateEmail = (email: string): ValidationResult => {
  // Trim whitespace
  const trimmedEmail = email.trim();

  // Check for empty email
  if (!trimmedEmail) {
    return {
      isValid: false,
      error: "Email is required.",
    };
  }

  // Check length constraints (max 254 chars per RFC 5321)
  if (trimmedEmail.length > 254) {
    return {
      isValid: false,
      error: "Email address is too long.",
    };
  }

  // Check for dangerous characters that could be used in injection attacks
  const dangerousChars = /[<>'"]/;
  if (dangerousChars.test(trimmedEmail)) {
    return {
      isValid: false,
      error: "Email contains invalid characters.",
    };
  }

  // Comprehensive email regex pattern
  // Validates: local-part@domain.tld
  // - Local part: alphanumeric, dots, hyphens, underscores
  // - Domain: alphanumeric, dots, hyphens
  // - TLD: at least 2 characters
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: "Please enter a valid email address (e.g., user@example.com).",
    };
  }

  // Additional checks for edge cases
  // No consecutive dots
  if (trimmedEmail.includes("..")) {
    return {
      isValid: false,
      error: "Email address format is invalid.",
    };
  }

  // No dot at start or end of local part
  const [localPart, domain] = trimmedEmail.split("@");
  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    return {
      isValid: false,
      error: "Email address format is invalid.",
    };
  }

  // Validate domain has at least one dot
  if (!domain || !domain.includes(".")) {
    return {
      isValid: false,
      error: "Email domain is invalid.",
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Validates password strength and length
 * Enforces minimum security requirements
 * @param password - Password to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export const validatePassword = (password: string): ValidationResult => {
  // Check for empty password
  if (!password) {
    return {
      isValid: false,
      error: "Password is required.",
    };
  }

  // Minimum length requirement (8 characters is industry standard)
  const minLength = 8;
  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters long.`,
    };
  }

  // Maximum length to prevent DoS attacks
  const maxLength = 128;
  if (password.length > maxLength) {
    return {
      isValid: false,
      error: `Password must not exceed ${maxLength} characters.`,
    };
  }

  // Check for at least one letter (uppercase or lowercase)
  if (!/[a-zA-Z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one letter.",
    };
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one number.",
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Sanitizes string input to prevent XSS and injection attacks
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>'"]/g, "") // Remove potentially dangerous characters
    .substring(0, 1000); // Limit length to prevent DoS
};
