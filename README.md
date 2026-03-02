# Vite Project

A modern React application built with TypeScript, Vite, and React 19.

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

- **Node.js**: Version 18.0.0 or higher (v22.22.0 recommended)
- **npm**: Version 9.0.0 or higher (v10.9.4 recommended)

To check your current versions, run:

```bash
node --version
npm --version
```

If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm).

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd readme-installation-guide-09f06612
```

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- React 19.1.1 and React DOM
- Vite development server
- TypeScript and type definitions
- ESLint for code linting
- React Compiler plugin for performance optimization

The installation typically takes 1-2 minutes depending on your internet connection.

### 3. Verify Installation

To verify that everything is installed correctly, run:

```bash
npm run lint
```

If the installation was successful, the linter will run without errors (or display any existing code style issues).

## Development

### Starting the Development Server

To start the local development server:

```bash
npm run dev
```

This will:
- Start the Vite development server
- Enable Hot Module Replacement (HMR) for instant updates
- Open the application at `http://localhost:5173` (or the next available port)

You should see output similar to:

```
VITE v7.1.7  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Accessing the Application

Once the development server is running:

1. Open your web browser
2. Navigate to `http://localhost:5173`
3. The application will automatically reload when you make changes to the source code

### Development Features

- **Fast Refresh**: Changes to React components are reflected instantly
- **TypeScript Support**: Full type checking and IntelliSense
- **React Compiler**: Automatic optimization using babel-plugin-react-compiler
- **ESLint Integration**: Real-time code quality checks

## Building for Production

### Create a Production Build

To compile and optimize the application for production:

```bash
npm run build
```

This command will:
1. Run TypeScript compiler (`tsc -b`) to check types
2. Bundle and optimize assets with Vite
3. Generate production-ready files in the `dist/` directory

### Preview the Production Build

To test the production build locally:

```bash
npm run preview
```

This starts a local static server serving the files from `dist/` directory.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (type check + bundle) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## Project Structure

```
readme-installation-guide-09f06612/
├── src/                  # Source files
│   ├── App.tsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   ├── assets/          # Static assets (images, fonts, etc.)
│   └── pages/           # Page components
├── public/              # Public static files
├── dist/                # Production build output (generated)
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── eslint.config.js     # ESLint configuration
```

## Technology Stack

- **React 19.1.1**: Modern UI library with latest features
- **TypeScript 5.9.3**: Type-safe JavaScript
- **Vite 7.1.7**: Next-generation frontend build tool
- **ESLint**: Code quality and style enforcement
- **React Compiler**: Automatic React optimization

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. To specify a custom port:

```bash
npm run dev -- --port 3000
```

### Installation Errors

If you encounter errors during `npm install`:

1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules/` and `package-lock.json`
3. Run `npm install` again

### Build Errors

If TypeScript compilation fails during build:

1. Check for type errors: `npx tsc --noEmit`
2. Review the error messages and fix type issues
3. Run `npm run build` again

## Contributing

When contributing to this project:

1. Ensure all tests pass and linting is clean
2. Follow the existing code style and TypeScript conventions
3. Test your changes in both development and production builds

## Support

For issues, questions, or contributions, please refer to the project repository or contact the maintainers.
