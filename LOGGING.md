# User Action Logging Documentation

## Overview

This application now includes comprehensive logging for user actions, implemented with security best practices to prevent exposure of sensitive information.

## Logged Actions

### 1. User Login
- **Event**: When a user successfully logs in
- **Logged Data**: Masked email, timestamp
- **Example**:
  ```
  [2026-03-01T12:00:00.000Z] [INFO] User logged in | {"email":"us***@example.com","timestamp":"2026-03-01T12:00:00.000Z"}
  ```

### 2. Login Failure
- **Event**: When login attempt fails due to missing credentials
- **Logged Data**: Reason for failure, masked email (if provided)
- **Example**:
  ```
  [2026-03-01T12:00:00.000Z] [WARN] Login attempt failed | {"reason":"Missing credentials","email":"us***@example.com"}
  ```

### 3. User Logout
- **Event**: When a user signs out
- **Logged Data**: Masked email, timestamp
- **Example**:
  ```
  [2026-03-01T12:00:00.000Z] [INFO] User logged out | {"email":"us***@example.com","timestamp":"2026-03-01T12:00:00.000Z"}
  ```

### 4. Session Restoration
- **Event**: When a user's session is restored from localStorage on app load
- **Logged Data**: Masked email, timestamp
- **Example**:
  ```
  [2026-03-01T12:00:00.000Z] [INFO] Session restored | {"email":"us***@example.com","timestamp":"2026-03-01T12:00:00.000Z"}
  ```

## Security Features

### 1. Email Masking
All email addresses are automatically masked to show only:
- First 2 characters of the local part
- Full domain name
- Example: `user@example.com` becomes `us***@example.com`

### 2. Sensitive Data Redaction
The following types of data are completely redacted:
- `password` - Shown as `[REDACTED]`
- `token` - Shown as `[REDACTED]`
- `secret` - Shown as `[REDACTED]`
- `apiKey` - Shown as `[REDACTED]`
- `accessToken` - Shown as `[REDACTED]`

Any field containing these keywords (case-insensitive) will be redacted.

### 3. Nested Object Sanitization
The logger recursively sanitizes nested objects to ensure no sensitive data leaks through complex data structures.

## Implementation Details

### Logger Location
- **File**: `src/utils/logger.ts`
- **Functions**:
  - `logUserAction(action, level, details)` - Main logging function
  - `getStoredLogs()` - Retrieve logs from localStorage
  - `clearLogs()` - Clear all stored logs

### Log Storage
Logs are stored in two locations:

1. **Console Output** (Development)
   - Logged to browser console for immediate debugging
   - Color-coded by log level (info, warn, error)

2. **localStorage** (Optional)
   - Stored under key: `user_action_logs`
   - Limited to last 100 entries to prevent storage bloat
   - Can be retrieved using `getStoredLogs()`
   - Can be cleared using `clearLogs()`

### Log Levels
- `info` - Normal user actions (login, logout, session restore)
- `warn` - Failed attempts or concerning events
- `error` - Errors during user actions

## Usage Examples

### Logging a User Action
```typescript
import { logUserAction } from './utils/logger';

// Log successful login
logUserAction('User logged in', 'info', {
  email: 'user@example.com',  // Will be masked automatically
  timestamp: new Date().toISOString(),
});

// Log failed attempt
logUserAction('Login attempt failed', 'warn', {
  reason: 'Invalid credentials',
  email: 'user@example.com',
});
```

### Retrieving Logs
```typescript
import { getStoredLogs } from './utils/logger';

const logs = getStoredLogs();
console.log(`Total logs: ${logs.length}`);
logs.forEach(log => {
  console.log(`${log.timestamp}: ${log.action}`);
});
```

### Clearing Logs
```typescript
import { clearLogs } from './utils/logger';

clearLogs();
```

## Testing the Logger

A test file is provided at `src/utils/logger.test.ts` that demonstrates:
1. Email masking functionality
2. Password redaction
3. Sensitive key removal
4. Log storage and retrieval

To run the test (requires tsx):
```bash
npx tsx src/utils/logger.test.ts
```

## Browser Console Inspection

To view logs in the browser:
1. Open Developer Tools (F12)
2. Go to the Console tab
3. Perform login/logout actions
4. Observe formatted log entries with masked sensitive data

To view stored logs:
```javascript
// In browser console
const logs = JSON.parse(localStorage.getItem('user_action_logs') || '[]');
console.table(logs);
```

## Future Enhancements

Potential improvements for production use:
1. Send logs to a centralized logging service (e.g., Sentry, LogRocket)
2. Add user session IDs for better tracking
3. Include browser/device information
4. Add performance metrics
5. Implement log rotation and cleanup strategies
6. Add integration with analytics platforms

## Privacy Compliance

This logging implementation is designed with privacy in mind:
- No passwords or sensitive credentials are logged
- Email addresses are masked
- Logs are stored locally and not transmitted
- Users can clear their logs at any time
- Compliant with general data protection guidelines

For production use, ensure compliance with:
- GDPR (if serving EU users)
- CCPA (if serving California users)
- Other applicable data protection regulations
