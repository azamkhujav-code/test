# Type-Safe Local Storage Guide

## Overview

This project implements a type-safe wrapper around the browser's `localStorage` API to prevent runtime errors and improve code maintainability. The utility provides compile-time type checking and runtime validation for all storage operations.

## Features

- **Type Safety**: All storage keys and values are strongly typed using TypeScript
- **Runtime Validation**: Values are validated at runtime to ensure type correctness
- **JSON Serialization**: Automatic JSON serialization/deserialization
- **Error Handling**: Comprehensive error handling with helpful console messages
- **Developer Experience**: Full IntelliSense support and autocomplete for storage keys

## Architecture

### Storage Schema

The storage schema is defined in `src/utils/storage.ts`:

```typescript
export interface StorageSchema {
  userEmail: string;
  loggedIn: boolean;
}
```

This interface defines all valid localStorage keys and their expected types. Adding new storage keys requires updating this interface.

### API Methods

#### `getItem<K extends StorageKey>(key: K): StorageSchema[K] | null`

Retrieves a value from localStorage with type safety.

**Example:**
```typescript
import { getItem } from './utils/storage';

const email = getItem('userEmail'); // Type: string | null
const isLoggedIn = getItem('loggedIn'); // Type: boolean | null
```

**Returns:**
- The typed value if found and valid
- `null` if not found or validation fails

#### `setItem<K extends StorageKey>(key: K, value: StorageSchema[K]): void`

Stores a value in localStorage with type validation.

**Example:**
```typescript
import { setItem } from './utils/storage';

setItem('userEmail', 'user@example.com'); // OK
setItem('loggedIn', true); // OK

// TypeScript error: Type 'number' is not assignable to type 'boolean'
setItem('loggedIn', 123); // Error!
```

**Throws:** Error if type validation fails

#### `removeItem<K extends StorageKey>(key: K): void`

Removes a value from localStorage.

**Example:**
```typescript
import { removeItem } from './utils/storage';

removeItem('userEmail');
removeItem('loggedIn');
```

#### `hasItem<K extends StorageKey>(key: K): boolean`

Checks if a key exists in localStorage.

**Example:**
```typescript
import { hasItem } from './utils/storage';

if (hasItem('userEmail')) {
  console.log('User is logged in');
}
```

#### `clear(): void`

Clears all items from localStorage. Use with caution.

**Example:**
```typescript
import { clear } from './utils/storage';

clear(); // Removes all localStorage data
```

## Adding New Storage Keys

To add a new storage key:

1. Update the `StorageSchema` interface in `src/utils/storage.ts`:

```typescript
export interface StorageSchema {
  userEmail: string;
  loggedIn: boolean;
  theme: 'light' | 'dark'; // New key
  preferences: {
    notifications: boolean;
    language: string;
  }; // Complex types supported
}
```

2. Update the `validateType` function to handle the new type:

```typescript
function validateType<K extends StorageKey>(
  key: K,
  value: unknown
): value is StorageSchema[K] {
  switch (key) {
    case 'userEmail':
      return typeof value === 'string';
    case 'loggedIn':
      return typeof value === 'boolean';
    case 'theme':
      return value === 'light' || value === 'dark';
    case 'preferences':
      return (
        typeof value === 'object' &&
        value !== null &&
        'notifications' in value &&
        'language' in value
      );
    default:
      return false;
  }
}
```

## Benefits

### Before (Unsafe)

```typescript
// No type safety
localStorage.setItem('userEmail', email);
localStorage.setItem('loggedIn', 'true'); // String instead of boolean

// No autocomplete
const email = localStorage.getItem('userEmai'); // Typo not caught
const isLoggedIn = localStorage.getItem('loggedIn'); // Type: string | null
```

### After (Type-Safe)

```typescript
// Full type safety
setItem('userEmail', email); // Type: string
setItem('loggedIn', true); // Type: boolean

// Autocomplete for keys
const email = getItem('userEmail'); // Type: string | null
const isLoggedIn = getItem('loggedIn'); // Type: boolean | null
```

## Error Handling

The utility provides comprehensive error handling:

- **Type Mismatch**: Logs a warning and returns `null` for invalid types
- **JSON Parse Errors**: Catches and logs parse errors
- **Storage Errors**: Handles quota exceeded and other storage errors

Example console output:

```
Warning: Invalid type for key "loggedIn". Expected type mismatch.
Error: Error reading localStorage key "userEmail": SyntaxError: Unexpected token
```

## Migration Guide

### Migrating Existing Code

Replace direct `localStorage` calls with the typed utility:

```typescript
// Before
const email = localStorage.getItem('userEmail');
localStorage.setItem('userEmail', email);
localStorage.removeItem('userEmail');

// After
import { getItem, setItem, removeItem } from './utils/storage';

const email = getItem('userEmail');
setItem('userEmail', email);
removeItem('userEmail');
```

### Handling Existing Data

The utility handles migration automatically. If old data is stored as raw strings instead of JSON, the validation will fail gracefully and return `null`. You may need to clear old data or implement a migration:

```typescript
// Clear old untyped data
if (hasItem('loggedIn')) {
  const value = getItem('loggedIn');
  if (value === null) {
    // Old data format, migrate
    removeItem('loggedIn');
    setItem('loggedIn', true);
  }
}
```

## Best Practices

1. **Always update the schema**: When adding new storage keys, update `StorageSchema`
2. **Implement validation**: Add runtime validation for complex types
3. **Handle null returns**: Always check for `null` when calling `getItem`
4. **Use TypeScript**: Leverage TypeScript's type checking
5. **Avoid clear()**: Only use `clear()` when absolutely necessary

## Testing

To test storage operations:

```typescript
import { setItem, getItem, removeItem, hasItem } from './utils/storage';

// Test storing and retrieving
setItem('userEmail', 'test@example.com');
console.assert(getItem('userEmail') === 'test@example.com');

// Test removal
removeItem('userEmail');
console.assert(getItem('userEmail') === null);
console.assert(hasItem('userEmail') === false);

// Test type safety (compile-time)
setItem('loggedIn', true); // OK
setItem('loggedIn', 'true'); // TypeScript error
```

## Troubleshooting

### Issue: Type validation fails for valid data

**Solution**: Ensure the `validateType` function correctly validates your type structure.

### Issue: Old data returns null

**Solution**: Migrate old data by clearing and resetting with the typed API.

### Issue: Quota exceeded errors

**Solution**: Monitor storage usage and implement data cleanup strategies.

## Future Enhancements

Potential improvements:

- Storage quota monitoring
- Automatic data migration
- Storage event listeners
- Encryption for sensitive data
- Versioning for schema changes
- LRU cache for frequently accessed keys
