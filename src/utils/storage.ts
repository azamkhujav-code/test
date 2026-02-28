/**
 * Type-safe local storage utility
 * Provides strongly-typed access to localStorage with runtime validation
 */

// Define the schema for all localStorage keys and their types
export interface StorageSchema {
  userEmail: string;
  loggedIn: boolean;
}

// Type for all valid storage keys
export type StorageKey = keyof StorageSchema;

/**
 * Type guard to validate values against their expected types
 */
function validateType<K extends StorageKey>(
  key: K,
  value: unknown
): value is StorageSchema[K] {
  switch (key) {
    case 'userEmail':
      return typeof value === 'string';
    case 'loggedIn':
      return typeof value === 'boolean';
    default:
      return false;
  }
}

/**
 * Get an item from localStorage with type safety
 * @param key - The storage key
 * @returns The typed value or null if not found or invalid
 */
export function getItem<K extends StorageKey>(
  key: K
): StorageSchema[K] | null {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }

    // Parse the JSON value
    const parsed = JSON.parse(item);

    // Validate the type at runtime
    if (validateType(key, parsed)) {
      return parsed;
    }

    console.warn(`Invalid type for key "${key}". Expected type mismatch.`);
    return null;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Set an item in localStorage with type safety
 * @param key - The storage key
 * @param value - The typed value to store
 */
export function setItem<K extends StorageKey>(
  key: K,
  value: StorageSchema[K]
): void {
  try {
    // Validate the type before storing
    if (!validateType(key, value)) {
      throw new Error(
        `Type mismatch for key "${key}". Cannot store invalid type.`
      );
    }

    // Serialize to JSON
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    throw error;
  }
}

/**
 * Remove an item from localStorage
 * @param key - The storage key to remove
 */
export function removeItem<K extends StorageKey>(key: K): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

/**
 * Clear all items from localStorage
 * Use with caution as this removes all stored data
 */
export function clear(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Check if a key exists in localStorage
 * @param key - The storage key to check
 * @returns true if the key exists, false otherwise
 */
export function hasItem<K extends StorageKey>(key: K): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking localStorage key "${key}":`, error);
    return false;
  }
}
