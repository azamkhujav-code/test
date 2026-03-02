/**
 * Secure Storage Utility
 * 
 * Provides encrypted storage wrapper around localStorage to protect sensitive data.
 * Uses a combination of XOR cipher and Base64 encoding for obfuscation.
 * 
 * IMPORTANT: For production applications, use proper encryption libraries like:
 * - crypto-js for AES encryption
 * - Web Crypto API for native browser encryption
 * 
 * This implementation provides basic protection against casual inspection
 * but should not be considered cryptographically secure for highly sensitive data.
 */

// Generate a consistent key from a seed string
const generateKey = (seed: string): number[] => {
  const key: number[] = [];
  for (let i = 0; i < seed.length; i++) {
    key.push(seed.charCodeAt(i));
  }
  return key;
};

// Simple XOR cipher for obfuscation
const xorCipher = (text: string, key: number[]): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key[i % key.length]);
  }
  return result;
};

// Encode to Base64
const encode = (text: string): string => {
  try {
    return btoa(encodeURIComponent(text));
  } catch (e) {
    console.error('Encoding failed:', e);
    return '';
  }
};

// Decode from Base64
const decode = (encoded: string): string => {
  try {
    return decodeURIComponent(atob(encoded));
  } catch (e) {
    console.error('Decoding failed:', e);
    return '';
  }
};

// Application-specific encryption key (in production, this should be environment-specific)
const ENCRYPTION_KEY = generateKey('secure-app-key-2026');

/**
 * Securely store a value in localStorage with encryption
 * @param key - The storage key
 * @param value - The value to store
 */
export const secureSetItem = (key: string, value: string): void => {
  try {
    // Sanitize the key to prevent injection
    const sanitizedKey = key.replace(/[^\w-]/g, '_');
    
    // Encrypt the value
    const encrypted = xorCipher(value, ENCRYPTION_KEY);
    
    // Encode to Base64 for safe storage
    const encoded = encode(encrypted);
    
    // Store with a prefix to identify encrypted data
    localStorage.setItem(`secure_${sanitizedKey}`, encoded);
  } catch (error) {
    console.error('Failed to securely store item:', error);
    throw new Error('Storage operation failed');
  }
};

/**
 * Retrieve and decrypt a value from localStorage
 * @param key - The storage key
 * @returns The decrypted value or null if not found
 */
export const secureGetItem = (key: string): string | null => {
  try {
    // Sanitize the key
    const sanitizedKey = key.replace(/[^\w-]/g, '_');
    
    // Retrieve the encoded value
    const encoded = localStorage.getItem(`secure_${sanitizedKey}`);
    
    if (!encoded) {
      return null;
    }
    
    // Decode from Base64
    const encrypted = decode(encoded);
    
    if (!encrypted) {
      return null;
    }
    
    // Decrypt the value
    const decrypted = xorCipher(encrypted, ENCRYPTION_KEY);
    
    return decrypted;
  } catch (error) {
    console.error('Failed to retrieve secure item:', error);
    return null;
  }
};

/**
 * Remove a value from secure storage
 * @param key - The storage key
 */
export const secureRemoveItem = (key: string): void => {
  try {
    const sanitizedKey = key.replace(/[^\w-]/g, '_');
    localStorage.removeItem(`secure_${sanitizedKey}`);
  } catch (error) {
    console.error('Failed to remove secure item:', error);
  }
};

/**
 * Clear all secure storage items
 */
export const secureClearAll = (): void => {
  try {
    const keysToRemove: string[] = [];
    
    // Find all keys with our secure prefix
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('secure_')) {
        keysToRemove.push(key);
      }
    }
    
    // Remove all secure keys
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Failed to clear secure storage:', error);
  }
};

/**
 * Check if a secure item exists
 * @param key - The storage key
 * @returns true if the item exists, false otherwise
 */
export const secureHasItem = (key: string): boolean => {
  const sanitizedKey = key.replace(/[^\w-]/g, '_');
  return localStorage.getItem(`secure_${sanitizedKey}`) !== null;
};
