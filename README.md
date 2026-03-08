# React Vite Login App

## Overview

This project is a simple React application bootstrapped with Vite. It demonstrates a basic login and home flow using client-side state and localStorage. The app is intended for demonstration and onboarding purposes.

## Tech Stack
- React 19
- Vite
- TypeScript
- ESLint

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser to [http://localhost:5173](http://localhost:5173)

## Project Structure

```
├── src/
│   └── pages/
│       ├── Login.tsx   # Login form component
│       └── Home.tsx    # Home page after login
├── package.json        # Project configuration and scripts
├── README.md           # Project documentation
├── README_login.md     # (Legacy) Login flow instructions
└── .gitignore          # Files and directories to ignore in git
```

## Login/Home Flow

- On first load, the user is presented with a login form (email and password required).
- Upon successful login (any non-empty email/password), the user's email is stored in localStorage and the Home page is shown.
- The Home page greets the user by email and provides a "Sign out" button.
- Signing out clears the user from localStorage and returns to the login screen.

### Manual Testing Steps
1. Enter an email and password on the login form.
2. After login, you should see a Welcome page with a Sign out option.
3. Click Sign out to return to the login screen.

## Available Scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint on the codebase

## Contributing
- Fork and clone the repository
- Create a new branch for your feature or fix
- Ensure code passes linting and runs locally
- Submit a pull request with a clear description

## Troubleshooting
- If you encounter issues starting the dev server, ensure Node.js and npm are up to date
- Delete `node_modules` and reinstall dependencies if errors persist

## Notes
- This app uses only client-side authentication for demonstration purposes
- For production, integrate with a secure backend authentication system

## License
MIT
