# Vite React Login App

A lightweight React application built with TypeScript and Vite, featuring a client-side login and authentication flow.

## Tech Stack

- **React** 19 with TypeScript
- **Vite** 7 for fast development and bundling
- **React Compiler** via `babel-plugin-react-compiler`
- **ESLint** for code linting

## Project Structure

```
src/
  main.tsx          # Application entry point (React StrictMode)
  App.tsx           # Root component managing auth state
  App.css           # Application styles
  index.css         # Global styles
  pages/
    Login.tsx       # Login form with email/password fields
    Home.tsx        # Welcome page shown after authentication
public/
  vite.svg          # Vite logo asset
index.html          # HTML entry point
vite.config.ts      # Vite configuration with React plugin
```

## Features

- **Login page** -- Email and password form with client-side validation
- **Authenticated home page** -- Displays a personalized welcome message with the user's email
- **Session persistence** -- Login state is stored in `localStorage` so sessions survive page reloads
- **Sign out** -- Clears stored session data and returns to the login screen

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server starts at [http://localhost:5173](http://localhost:5173) by default.

### Build

```bash
npm run build
```

Runs the TypeScript compiler followed by the Vite production build. Output is placed in the `dist/` directory.

### Preview

```bash
npm run preview
```

Serves the production build locally for testing.

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

## How It Works

1. On launch, `App` checks `localStorage` for a previously stored user email.
2. If no user is found, the `Login` page is rendered.
3. The user enters an email and password. Both fields are required.
4. On successful submission, the email is saved to `localStorage` and the app navigates to the `Home` page.
5. The `Home` page greets the user by email and provides a **Sign out** button.
6. Signing out clears `localStorage` and returns to the login screen.

## License

This project is private and not published to any package registry.
