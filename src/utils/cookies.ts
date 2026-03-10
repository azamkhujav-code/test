/**
 * Cookie utility functions for HttpOnly cookie handling
 * Note: HttpOnly cookies (like 'loggedIn') cannot be accessed by JavaScript
 * Only non-HttpOnly cookies (like 'userEmail') can be read via document.cookie
 */

/**
 * Get a cookie value by name from document.cookie
 * @param name - The cookie name to retrieve
 * @returns The decoded cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      const value = cookie.substring(nameEQ.length);
      try {
        return decodeURIComponent(value);
      } catch {
        return value;
      }
    }
  }

  return null;
}

/**
 * Check if user is logged in by looking for the userEmail cookie
 * The 'loggedIn' HttpOnly cookie cannot be accessed from JavaScript
 * @returns true if userEmail cookie exists, false otherwise
 */
export function isLoggedIn(): boolean {
  return getCookie('userEmail') !== null;
}

/**
 * Get the current user email from the userEmail cookie
 * @returns The user email or null if not logged in
 */
export function getCurrentUser(): string | null {
  return getCookie('userEmail');
}
