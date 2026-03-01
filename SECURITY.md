# Security Implementation Guide

## Overview

This application implements secure authentication token management using HttpOnly cookies instead of localStorage, significantly enhancing security against XSS attacks.

## Security Features

### 1. HttpOnly Cookies
- **Protection**: Authentication tokens are stored in HttpOnly cookies that cannot be accessed via JavaScript
- **Benefit**: Prevents token theft through XSS vulnerabilities
- **Implementation**: Session cookies are configured with `httpOnly: true` flag

### 2. CSRF Protection
- **Protection**: Cross-Site Request Forgery protection using token-based validation
- **Benefit**: Prevents unauthorized state-changing operations
- **Implementation**: CSRF tokens are required for POST, PUT, DELETE, and PATCH requests

### 3. Secure Session Management
- **Session Regeneration**: Session IDs are regenerated on login to prevent fixation attacks
- **Session Configuration**:
  - `sameSite: 'strict'` - Prevents CSRF attacks
  - `secure: true` (in production) - HTTPS-only transmission
  - `maxAge: 24 hours` - Automatic session expiration

### 4. Memory-based Token Storage
- **Protection**: CSRF tokens stored in memory, not localStorage
- **Benefit**: Tokens are cleared on page refresh/close
- **Implementation**: In-memory variable in API utility module

## Architecture

### Backend (Express Server)

**Location**: `server/index.ts`

**Endpoints**:
- `GET /api/auth/csrf-token` - Get CSRF token
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/verify` - Verify authentication status
- `POST /api/auth/logout` - Logout and destroy session

**Security Middleware**:
- Cookie parser for HttpOnly cookies
- Express session with secure configuration
- CORS with credentials support
- CSRF token validation for state-changing operations

### Frontend (React Application)

**API Utility** (`src/utils/api.ts`):
- Secure fetch wrapper with automatic CSRF token handling
- Credentials included in all requests
- Error handling and retry logic

**Authentication Context** (`src/context/AuthContext.tsx`):
- Global authentication state management
- Auto-verification on app load
- Centralized login/logout logic

**Custom Hook** (`src/hooks/useAuth.ts`):
- Convenient access to auth context
- Type-safe authentication state

## Security Comparison

### Before (localStorage)
```javascript
// ❌ VULNERABLE TO XSS
localStorage.setItem('token', 'secret-token');
const token = localStorage.getItem('token');
// Malicious script can access: localStorage.getItem('token')
```

### After (HttpOnly Cookies)
```javascript
// ✅ PROTECTED FROM XSS
// Token stored in HttpOnly cookie by server
// JavaScript cannot access the cookie
// Automatically included in requests via browser
```

## Running the Application

### Development Mode

1. **Start Backend Server**:
   ```bash
   npm run dev:server
   ```
   Server runs on http://localhost:3001

2. **Start Frontend Dev Server** (in separate terminal):
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:5173

3. **Or Start Both Simultaneously**:
   ```bash
   npm run dev:all
   ```

### Production Considerations

1. **Environment Variables**:
   Create `.env` file (see `.env.example`):
   ```env
   NODE_ENV=production
   SESSION_SECRET=<generate-secure-random-string>
   PORT=3001
   ```

2. **Generate Session Secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **HTTPS Configuration**:
   - Enable `secure: true` for cookies (already configured for production)
   - Use reverse proxy (nginx/Apache) with SSL certificates

4. **Session Store**:
   - Replace in-memory sessions with Redis or similar
   - Enables horizontal scaling and session persistence

## Testing the Security

### Verify HttpOnly Cookie
1. Login to the application
2. Open browser DevTools → Application/Storage → Cookies
3. Verify `sessionId` cookie has `HttpOnly` flag checked
4. Try accessing via console: `document.cookie` (should not show sessionId)

### Verify CSRF Protection
1. Login to the application
2. Try making POST request without CSRF token:
   ```javascript
   fetch('/api/auth/logout', {
     method: 'POST',
     credentials: 'include'
   })
   // Should fail with 403 Invalid CSRF token
   ```

### Verify Session Security
1. Login successfully
2. Check network tab for session cookie in response
3. Session cookie should have:
   - HttpOnly: ✓
   - Secure: ✓ (in production)
   - SameSite: Strict

## Migration from localStorage

### Removed Patterns
```javascript
// ❌ Removed
localStorage.setItem('userEmail', email);
localStorage.setItem('loggedIn', 'true');
localStorage.getItem('userEmail');
localStorage.removeItem('loggedIn');
```

### New Patterns
```javascript
// ✅ Use secure API
import { login, logout, verifyAuth } from './utils/api';

// Login
await login(email, password);

// Logout
await logout();

// Verify
const { authenticated, user } = await verifyAuth();
```

## Security Best Practices

1. **Never Store Sensitive Data in localStorage**
   - Tokens, passwords, or PII should never go in localStorage
   - Use HttpOnly cookies for authentication tokens

2. **Always Use CSRF Protection**
   - Required for all state-changing operations
   - Token automatically managed by API utility

3. **Enable HTTPS in Production**
   - Cookies with `secure` flag only work over HTTPS
   - Use SSL/TLS certificates

4. **Regular Security Audits**
   - Run `npm audit` regularly
   - Keep dependencies updated
   - Review session configuration

5. **Rate Limiting** (TODO)
   - Implement rate limiting on login endpoint
   - Prevent brute-force attacks

6. **Password Requirements** (TODO)
   - Enforce strong password policies
   - Implement password hashing (bcrypt)

## References

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [MDN: Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
