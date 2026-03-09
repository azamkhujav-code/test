import crypto from 'crypto';

// Generate a random CSRF token
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Set CSRF token as a cookie and return it
export const setCSRFToken = (): string => {
  const csrfToken = generateCSRFToken();
  document.cookie = `XSRF-TOKEN=${csrfToken}; path=/; SameSite=Strict`;
  return csrfToken;
};

// Get CSRF token from cookies
export const getCSRFToken = (): string | null => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'XSRF-TOKEN') {
      return value;
    }
  }
  return null;
};

// Validate CSRF token
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken();
  return storedToken !== null && token === storedToken;
};