import {
  User,
  verifyPassword,
  generateSecureToken,
  sanitizeEmail,
  validateEmail,
} from '../utils/auth';

/**
 * Authentication Service
 * 
 * This service manages user authentication with secure password handling.
 * In a production environment, this would connect to a backend API.
 * This mock implementation demonstrates security best practices:
 * - Passwords are stored as bcrypt hashes, never plain text
 * - Authentication uses secure token-based sessions
 * - User lookup and verification are separate operations
 */

/**
 * Mock user database with pre-hashed passwords
 * 
 * SECURITY NOTE: These are bcrypt hashes of test passwords.
 * In production, this data would be stored in a secure database.
 * 
 * Test credentials:
 * - demo@example.com / Demo123!
 * - test@example.com / Test456!
 * - admin@example.com / Admin789!
 */
const MOCK_USERS: User[] = [
  {
    email: 'demo@example.com',
    // Hash of: Demo123!
    passwordHash: '$2b$10$eTytEQGHH5xKRaJ52mYoEe4/R5RcPnv3mrhLMIBSY4sRomTz/1BZa',
  },
  {
    email: 'test@example.com',
    // Hash of: Test456!
    passwordHash: '$2b$10$t/7D18p4ie1Y4JDUnQn/9uU3zb91R1EpvxUe/K69bXLnrBfcNHUzW',
  },
  {
    email: 'admin@example.com',
    // Hash of: Admin789!
    passwordHash: '$2b$10$CyHnv6Z96SUf/P8GfLCSGe1T/D5gdMvqGf7jUYHobnoYNYPbYamPO',
  },
];

/**
 * Session storage interface
 */
interface Session {
  token: string;
  email: string;
  createdAt: number;
}

/**
 * Authentication result interface
 */
export interface AuthResult {
  success: boolean;
  token?: string;
  email?: string;
  error?: string;
}

/**
 * Finds a user by email in the mock database
 * 
 * @param email - The email to search for
 * @returns User object if found, undefined otherwise
 */
function findUserByEmail(email: string): User | undefined {
  const sanitized = sanitizeEmail(email);
  return MOCK_USERS.find((user) => user.email === sanitized);
}

/**
 * Authenticates a user with email and password
 * 
 * SECURITY: This function follows secure authentication practices:
 * 1. Validates email format
 * 2. Looks up user by email
 * 3. Verifies password against stored hash (never plain text comparison)
 * 4. Generates secure session token on success
 * 5. Never reveals whether email or password was incorrect (prevents user enumeration)
 * 
 * @param email - User's email address
 * @param password - User's plain text password (will be verified against hash)
 * @returns Promise resolving to AuthResult with token if successful
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResult> {
  // Validate email format
  if (!validateEmail(email)) {
    return {
      success: false,
      error: 'Invalid email or password', // Generic error to prevent user enumeration
    };
  }

  // Find user by email
  const user = findUserByEmail(email);
  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password', // Same error message for security
    };
  }

  // Verify password against hash
  const isPasswordValid = await verifyPassword(password, user.passwordHash);
  if (!isPasswordValid) {
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  // Generate secure session token
  const token = generateSecureToken();

  // Store session (in production, this would be server-side)
  const session: Session = {
    token,
    email: user.email,
    createdAt: Date.now(),
  };

  // Store session in sessionStorage (more secure than localStorage for tokens)
  sessionStorage.setItem('authSession', JSON.stringify(session));

  return {
    success: true,
    token,
    email: user.email,
  };
}

/**
 * Validates an existing session
 * 
 * @returns Session data if valid, null otherwise
 */
export function validateSession(): Session | null {
  try {
    const sessionData = sessionStorage.getItem('authSession');
    if (!sessionData) {
      return null;
    }

    const session: Session = JSON.parse(sessionData);

    // In production, validate token expiration here
    // For now, we'll accept any valid session

    return session;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

/**
 * Logs out the current user by clearing the session
 */
export function logout(): void {
  sessionStorage.removeItem('authSession');
  // Also clear any legacy localStorage items
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userEmail');
}

/**
 * Gets the current authenticated user's email
 * 
 * @returns User email if authenticated, null otherwise
 */
export function getCurrentUser(): string | null {
  const session = validateSession();
  return session ? session.email : null;
}
