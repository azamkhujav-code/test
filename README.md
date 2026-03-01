# Vite React TypeScript Project

A modern web application built with React, TypeScript, and Vite, featuring fast development builds and hot module replacement.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** (version 9.0.0 or higher) or **yarn** (version 1.22.0 or higher)
  - npm comes bundled with Node.js
  - Verify installation: `npm --version`

- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vite-project
```

Replace `<repository-url>` with the actual URL of this repository.

### 2. Install Dependencies

Install all required packages using npm:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

This will install all dependencies listed in `package.json`, including:
- React 19.1.1
- React DOM 19.1.1
- TypeScript 5.9.3
- Vite 7.1.7
- ESLint and related plugins

### 3. Verify Installation

After installation completes, verify that all dependencies are installed correctly:

```bash
npm list --depth=0
```

You should see a list of installed packages without any errors.

## Development

### Starting the Development Server

To start the development server with hot module replacement:

```bash
npm run dev
```

This will:
- Start the Vite development server
- Enable hot module replacement (HMR)
- Open the application (by default on `http://localhost:5173`)

You should see output similar to:

```
VITE v7.1.7  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Accessing the Application

Once the development server is running:

1. Open your browser
2. Navigate to `http://localhost:5173`
3. You should see the application running

The page will automatically reload if you make changes to the source code.

### Development Tips

- **Hot Module Replacement**: Changes to React components will be reflected instantly without full page reload
- **TypeScript Type Checking**: TypeScript will check types in real-time as you code
- **ESLint**: Code quality issues will be highlighted in your editor (if configured)

## Building for Production

### Create Production Build

To create an optimized production build:

```bash
npm run build
```

This command will:
1. Run TypeScript compiler to check types (`tsc -b`)
2. Bundle and minify your code with Vite
3. Generate optimized assets in the `dist` directory

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

This starts a local server to preview your production build (typically on `http://localhost:4173`).

## Project Structure

```
vite-project/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, and other assets
│   ├── pages/          # Page components (Home, Login, etc.)
│   ├── App.tsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── eslint.config.js    # ESLint configuration
└── README.md           # Project documentation
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Starts the development server with HMR |
| **build** | `npm run build` | Creates optimized production build |
| **preview** | `npm run preview` | Preview production build locally |
| **lint** | `npm run lint` | Run ESLint to check code quality |

### Running Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Troubleshooting

### Common Issues and Solutions

#### Port Already in Use

If port 5173 is already in use:

```bash
# Option 1: Kill the process using the port (macOS/Linux)
lsof -ti:5173 | xargs kill -9

# Option 2: Use a different port
npm run dev -- --port 3000
```

#### Dependencies Installation Fails

If `npm install` fails:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

#### TypeScript Errors

If you encounter TypeScript errors:

```bash
# Check TypeScript version
npx tsc --version

# Run type checking manually
npx tsc --noEmit
```

#### Module Not Found Errors

If you see "Module not found" errors:

1. Ensure all dependencies are installed: `npm install`
2. Restart the development server: `Ctrl+C` then `npm run dev`
3. Clear Vite cache: `rm -rf node_modules/.vite`

### Getting Help

If you encounter issues not covered here:

1. Check the [Vite documentation](https://vitejs.dev/)
2. Check the [React documentation](https://react.dev/)
3. Search for similar issues in the project's issue tracker
4. Open a new issue with details about your problem

## Technology Stack

- **React 19.1.1** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.7** - Build tool and development server
- **ESLint** - Code quality and consistency
- **React Compiler** - Optimized React rendering

## License

[Add your license information here]

## Contributing

[Add contribution guidelines here]
