// CSRF token utilities
// Generates, stores, and retrieves a per-session CSRF token for anti-CSRF protection

export const CSRF_TOKEN_KEY = '__csrf_token__';

// Generate a cryptographically secure token (32 bytes, hex encoded)
export function generateCsrfToken(): string {
  try {
    const arr = new Uint8Array(32);
    // Web Crypto API for secure randomness
    if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
      // @ts-ignore - getRandomValues is available on global crypto
      crypto.getRandomValues(arr);
    } else {
      // Fallback for environments without crypto API
      for (let i = 0; i < arr.length; i++) {
        arr[i] = (Math.random() * 256) | 0;
      }
    }
    return Array.from(arr)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    // Final fallback
    return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
  }
}

// Ensure a CSRF token exists in localStorage and return it
export function ensureCsrfToken(): string {
  let token = localStorage.getItem(CSRF_TOKEN_KEY);
  if (!token) {
    token = generateCsrfToken();
    localStorage.setItem(CSRF_TOKEN_KEY, token);
  }
  return token;
}

// Retrieve the current CSRF token, or null if not set
export function getCsrfToken(): string | null {
  return localStorage.getItem(CSRF_TOKEN_KEY);
}
