# Home Page

This document describes the Home page component used in the login flow.

## Overview
- The Home component is shown after a user successfully logs in.
- It displays a welcome message that includes the user's email (if provided).
- It provides a Sign out button to end the session.

## File
- src/pages/Home.tsx

## Props
- user: string | undefined - The current user's email/identifier to display in the welcome message.
- onLogout: () => void - Callback invoked when the user clicks the Sign out button.

## Behavior
- Renders:
  - A heading: Welcome, [user]
- When the Sign out button is clicked, the onLogout prop is called to clear the session.

## Data Flow
- On login, App stores the user email in localStorage under 'userEmail' and 'loggedIn' flags.
- Home reads the user prop, typically derived from App state.
- Sign out clears localStorage and resets App state.

## Accessibility
- Button has accessible label via its text content.
- Root container uses semantic elements for clarity.

## Styling note
- The component relies on global CSS classes (home) defined in App CSS or global styles.

## Testing considerations
- Verify that when user prop is provided, the welcome message includes the user email.
- Verify that clicking Sign out triggers the onLogout callback and clears session state.

## Example
```tsx
import Home from './src/pages/Home';

// Usage in App.tsx (already wired in project)
<Home user="alice@example.com" onLogout={handleLogout} />
```
