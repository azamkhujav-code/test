/**
 * User type representing authenticated user data
 */
export interface User {
  email: string;
  displayName?: string;
  lastLogin?: Date;
}

/**
 * User state type for application state management
 * Represents either an authenticated user or no user (null)
 */
export type UserState = User | null;

/**
 * Type guard to check if a value is a valid User object
 */
export function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  
  const user = value as Record<string, unknown>;
  
  // Email is required and must be a string
  if (typeof user.email !== 'string' || user.email.trim() === '') {
    return false;
  }
  
  // DisplayName is optional but must be a string if present
  if (user.displayName !== undefined && typeof user.displayName !== 'string') {
    return false;
  }
  
  // LastLogin is optional but must be a Date if present
  if (user.lastLogin !== undefined && !(user.lastLogin instanceof Date)) {
    return false;
  }
  
  return true;
}

/**
 * Type guard to check if a value is a valid UserState
 */
export function isUserState(value: unknown): value is UserState {
  return value === null || isUser(value);
}

/**
 * Creates a User object from an email address
 */
export function createUser(email: string, displayName?: string): User {
  return {
    email,
    displayName,
    lastLogin: new Date(),
  };
}

/**
 * Serializes a User object for storage
 */
export function serializeUser(user: User): string {
  return JSON.stringify(user);
}

/**
 * Deserializes a User object from storage with validation
 */
export function deserializeUser(data: string): User | null {
  try {
    const parsed = JSON.parse(data);
    
    // Reconstruct Date objects if they exist
    if (parsed.lastLogin) {
      parsed.lastLogin = new Date(parsed.lastLogin);
    }
    
    // Validate the parsed data
    if (isUser(parsed)) {
      return parsed;
    }
    
    return null;
  } catch {
    return null;
  }
}
