/**
 * Represents a user in the application.
 * This type provides type safety for user state management.
 */
export interface User {
  /** User's email address (unique identifier) */
  email: string;
  /** Timestamp when the user logged in */
  loginTimestamp: number;
  /** Optional display name for the user */
  displayName?: string;
}

/**
 * Type guard to check if a value is a valid User object
 */
export function isUser(value: unknown): value is User {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;
  
  return (
    typeof obj.email === 'string' &&
    obj.email.length > 0 &&
    typeof obj.loginTimestamp === 'number' &&
    obj.loginTimestamp > 0 &&
    (obj.displayName === undefined || typeof obj.displayName === 'string')
  );
}

/**
 * Creates a User object from an email address
 */
export function createUser(email: string, displayName?: string): User {
  return {
    email,
    loginTimestamp: Date.now(),
    displayName,
  };
}
