import type { User } from '../types/user';
import { isUser } from '../types/user';

const STORAGE_KEYS = {
  USER: 'user',
  LOGGED_IN: 'loggedIn',
} as const;

/**
 * Type-safe localStorage utilities for user management
 */
export const storage = {
  /**
   * Saves a user object to localStorage
   */
  saveUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'true');
    } catch (error) {
      console.error('Failed to save user to storage:', error);
    }
  },

  /**
   * Retrieves a user object from localStorage with type checking
   */
  getUser(): User | null {
    try {
      const userJson = localStorage.getItem(STORAGE_KEYS.USER);
      if (!userJson) {
        return null;
      }

      const parsed = JSON.parse(userJson);
      
      // Validate that the parsed data matches User type
      if (isUser(parsed)) {
        return parsed;
      }

      console.warn('Invalid user data in storage, clearing...');
      this.clearUser();
      return null;
    } catch (error) {
      console.error('Failed to retrieve user from storage:', error);
      return null;
    }
  },

  /**
   * Removes user data from localStorage
   */
  clearUser(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.LOGGED_IN);
      // Also remove legacy userEmail key if it exists
      localStorage.removeItem('userEmail');
    } catch (error) {
      console.error('Failed to clear user from storage:', error);
    }
  },

  /**
   * Checks if a user is currently logged in
   */
  isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.LOGGED_IN) === 'true';
  },
};
