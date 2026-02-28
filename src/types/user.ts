/**
 * User type definition for type-safe user state management
 */
export interface User {
  email: string;
  loggedInAt?: Date;
}

/**
 * Type guard to check if a value is a valid User object
 */
export function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'email' in value &&
    typeof value.email === 'string' &&
    value.email.length > 0
  );
}
