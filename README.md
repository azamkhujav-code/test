# Vite React TypeScript Project

A modern web application built with React, TypeScript, and Vite, featuring the React Compiler for optimized performance.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher (recommended: 22.x)
- **npm**: Version 9.x or higher (comes with Node.js)

To verify your installations, run:

```bash
node --version
npm --version
```

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Install all required packages using npm:

```bash
npm install
```

This will install:
- **Runtime Dependencies**: React 19.x, React DOM
- **Development Dependencies**: Vite, TypeScript, ESLint, and related tooling

The installation process typically takes 1-2 minutes depending on your internet connection.

## Development

### Starting the Development Server

Launch the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will start and be accessible at:

```
http://localhost:5173
```

Key features of the dev server:
- **Hot Module Replacement (HMR)**: Changes reflect instantly without full page reload
- **Fast Refresh**: React components update while preserving state
- **TypeScript Support**: Real-time type checking and IntelliSense
- **React Compiler**: Automatic optimization of React components

### Accessing the Application

Once the server is running:

1. Open your browser and navigate to `http://localhost:5173`
2. The application will automatically reload when you save changes to source files
3. Check the terminal for any errors or warnings

### Stopping the Development Server

Press `Ctrl + C` in the terminal where the server is running.

## Building for Production

### Create a Production Build

Generate an optimized production build:

```bash
npm run build
```

This command:
1. Runs TypeScript compiler to check for type errors (`tsc -b`)
2. Builds the application using Vite
3. Outputs optimized static files to the `dist/` directory

Build outputs include:
- Minified JavaScript bundles with code splitting
- Optimized CSS with unused styles removed
- Compressed assets (images, fonts, etc.)
- Source maps for debugging (optional)

### Preview Production Build

Test the production build locally before deployment:

```bash
npm run preview
```

This starts a local server (typically at `http://localhost:4173`) serving the production build.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Linting

Check your code for style and potential errors:

```bash
npm run lint
```

ESLint is configured with:
- React-specific rules
- React Hooks validation
- TypeScript support
- Fast Refresh compatibility checks

## Project Structure

```
.
├── public/              # Static assets served as-is
├── src/
│   ├── assets/         # Application assets (images, fonts, etc.)
│   ├── pages/          # Page components
│   ├── App.tsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## Technology Stack

- **React 19.1**: Modern UI library with latest features
- **TypeScript 5.9**: Static type checking for JavaScript
- **Vite 7.1**: Next-generation frontend build tool
- **React Compiler**: Automatic optimization of React components
- **ESLint**: Code quality and consistency enforcement

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

**Dependencies installation fails:**
```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and not licensed for public use.
