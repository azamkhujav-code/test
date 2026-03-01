# Secure Authentication Testing

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start both backend and frontend**:
   ```bash
   npm run dev:all
   ```
   
   Or start separately:
   - Backend: `npm run dev:server` (http://localhost:3001)
   - Frontend: `npm run dev` (http://localhost:5173)

3. **Test the login flow**:
   - Open http://localhost:5173
   - Enter any email and password (demo mode accepts all credentials)
   - After login, you should see a Welcome page with security information
   - Sign out to return to the login screen

## Security Features

This application now uses **secure authentication** instead of localStorage:

- **HttpOnly Cookies**: Tokens are inaccessible to JavaScript, preventing XSS attacks
- **CSRF Protection**: All state-changing operations require valid CSRF tokens
- **Secure Sessions**: Session management with proper security flags
- **Memory-based Token Storage**: CSRF tokens stored in memory, not localStorage

## Testing Security

1. **Verify HttpOnly Cookie**:
   - Login and check browser DevTools → Application → Cookies
   - The `sessionId` cookie should have HttpOnly flag enabled
   - Try `document.cookie` in console - sessionId should not appear

2. **Verify CSRF Protection**:
   - All POST/DELETE requests require X-CSRF-Token header
   - Attempts without valid token will fail with 403 error

See `SECURITY.md` for complete security documentation.
