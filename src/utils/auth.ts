import bcrypt from 'bcryptjs';

/**
 * Secure Authentication Utilities
 * 
 * This module provides secure password hashing, validation, and authentication
 * functionality following security best practices:
 * - Passwords are never stored or transmitted in plain text
 * - bcrypt is used for secure password hashing with salt rounds
 * - Password strength validation is enforced
 * - Secure session tokens are generated
 */

// Configuration constants
const SALT_ROUNDS = 10; // bcrypt salt rounds for hashing
const TOKEN_LENGTH = 32; // Length of session tokens

/**
 * Password validation result interface
 */
export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

/**
 * User interface for authentication
 */
export interface User {
  email: string;
  passwordHash: string;
}

/**
 * Validates password strength according to security best practices
 * 
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * 
 * @param password - The password to validate
 * @returns PasswordValidation object with validation results
 */
export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = [];

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Hashes a password using bcrypt
 * 
 * SECURITY: This function should ONLY be called on password registration/change.
 * The hashed password should be stored, never the plain text password.
 * 
 * @param password - The plain text password to hash
 * @returns Promise resolving to the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

/**
 * Verifies a password against a hash
 * 
 * SECURITY: This function is used during login to verify credentials.
 * The plain text password is never stored, only compared against the hash.
 * 
 * @param password - The plain text password to verify
 * @param hash - The stored password hash to compare against
 * @returns Promise resolving to true if password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

/**
 * Generates a secure random session token
 * 
 * SECURITY: Tokens should be used instead of storing sensitive user data
 * in localStorage. Tokens can be invalidated and have expiration times.
 * 
 * @returns A secure random token string
 */
export function generateSecureToken(): string {
  const array = new Uint8Array(TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  );
}

/**
 * Sanitizes user email for safe storage and display
 * 
 * @param email - The email to sanitize
 * @returns Sanitized email in lowercase
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Validates email format
 * 
 * @param email - The email to validate
 * @returns True if email format is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
