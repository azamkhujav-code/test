# Login Flow Documentation

This document outlines the enhanced login flow implementation for our React application.

## Setup and Testing

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open http://localhost:5173 in your browser

## Components

1. **Login.tsx**: Handles user login form and submission.
2. **Home.tsx**: Displays user information and logout button after successful login.
3. **ErrorBoundary.tsx**: Catches and displays errors that occur in child components.

## Authentication Flow

1. Enter an email and password on the login form.
2. Valid credentials: any well-formed email, password: "password".
3. After successful login, you'll see a Welcome page with your email and a Sign out option.
4. Click Sign out to return to the login screen.

## Features

- Client-side email format and password length validation.
- Simulated API call with a 1-second delay for login.
- Persistent login across page refreshes using localStorage.
- Token expiration simulation (15 minutes by default).
- Automatic logout when token expires.
- Protected routes (Home component only renders for authenticated users).
- Error messages for invalid inputs and failed login attempts.
- Loading spinner during login process.

## State Management

- Authentication state managed using React Context (AuthContext).
- localStorage used for login persistence.

## TypeScript and Error Handling

- Comprehensive TypeScript types for improved type safety.
- ErrorBoundary component for catching unexpected errors.

## Testing the Full Flow

1. Attempt to log in with invalid credentials (should show error message).
2. Log in with valid credentials (any email, password: "password").
3. Verify that the Home page displays your email.
4. Refresh the page and check if you're still logged in.
5. Wait for 15 minutes to verify automatic logout (or reduce TOKEN_EXPIRATION_TIME in AuthContext.tsx for quicker testing).
6. Log in again, then manually log out.
7. Refresh the page to confirm redirect to the login page.

Note: This implementation uses client-side authentication simulation. In a production environment, always implement server-side authentication with proper security measures.
