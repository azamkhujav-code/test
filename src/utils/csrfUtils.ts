import crypto from 'crypto';

// Generate a random CSRF token
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Set CSRF token as a cookie and in session storage
export const setCSRFToken = (): string => {
  const csrfToken = generateCSRFToken();
  document.cookie = `XSRF-TOKEN=${csrfToken}; path=/; SameSite=Strict; HttpOnly`;
  sessionStorage.setItem('XSRF-TOKEN', csrfToken);
  return csrfToken;
};

// Get CSRF token from cookies
export const getCSRFTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'XSRF-TOKEN') {
      return value;
    }
  }
  return null;
};

// Get CSRF token from session storage
export const getCSRFTokenFromStorage = (): string | null => {
  return sessionStorage.getItem('XSRF-TOKEN');
};

// Validate CSRF token
export const validateCSRFToken = (token: string): boolean => {
  const cookieToken = getCSRFTokenFromCookie();
  const storageToken = getCSRFTokenFromStorage();
  return cookieToken === storageToken && token === cookieToken;
};

// Get CSRF token (preferably from session storage)
export const getCSRFToken = (): string | null => {
  return getCSRFTokenFromStorage() || getCSRFTokenFromCookie();
};