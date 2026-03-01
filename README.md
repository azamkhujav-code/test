# Vite + React + TypeScript Project

A modern web application built with React, TypeScript, and Vite, featuring the React Compiler for optimized performance.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Available Scripts](#available-scripts)
- [Technology Stack](#technology-stack)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher recommended)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** (version 9.0.0 or higher)
  - Comes bundled with Node.js
  - Verify installation: `npm --version`

Alternatively, you can use other package managers:
- **yarn** (version 1.22.0 or higher)
- **pnpm** (version 8.0.0 or higher)

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vite-project
```

### 2. Install Dependencies

Using npm (recommended):

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

This will install all required dependencies including:
- React 19.1.1
- TypeScript 5.9.3
- Vite 7.1.7
- ESLint and related plugins
- React Compiler (Babel plugin)

### 3. Verify Installation

After installation completes, verify that all dependencies were installed correctly:

```bash
npm list --depth=0
```

## Development

### Starting the Development Server

To start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:5173`
- **Network**: The terminal will display your network address for testing on other devices

The development server features:
- Fast Hot Module Replacement (HMR)
- Instant server start
- TypeScript type checking
- ESLint integration
- React Compiler optimizations

### Accessing the Application

1. Open your web browser
2. Navigate to `http://localhost:5173`
3. The application should load and display the React interface

To stop the development server, press `Ctrl + C` in the terminal.

## Building for Production

### Create a Production Build

To build the application for production:

```bash
npm run build
```

This command will:
1. Run TypeScript compiler (`tsc -b`)
2. Build optimized production assets with Vite
3. Output files to the `dist/` directory

### Preview the Production Build

To preview the production build locally:

```bash
npm run preview
```

This starts a local server to preview the production build before deployment.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with HMR |
| `npm run build` | Creates an optimized production build |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run preview` | Previews the production build locally |

## Technology Stack

This project is built with:

- **React** (19.1.1) - UI library
- **TypeScript** (5.9.3) - Type-safe JavaScript
- **Vite** (7.1.7) - Next-generation frontend build tool
- **React Compiler** - Automatic optimization of React components
- **ESLint** (9.36.0) - Code linting and quality checks

### Development Tools

- `@vitejs/plugin-react` - Vite plugin for React
- `babel-plugin-react-compiler` - React Compiler integration
- `eslint-plugin-react-hooks` - ESLint rules for React Hooks
- `eslint-plugin-react-refresh` - ESLint rules for React Fast Refresh

## Troubleshooting

### Common Issues

**Port 5173 is already in use:**
```bash
# Kill the process using port 5173
# On Linux/Mac:
lsof -ti:5173 | xargs kill -9
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
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
# Ensure TypeScript is properly installed
npm install --save-dev typescript
# Run type checking
npx tsc --noEmit
```

## Contributing

When contributing to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting: `npm run lint`
5. Build the project: `npm run build`
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is private and not licensed for public use.