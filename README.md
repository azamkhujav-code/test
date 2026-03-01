# Vite + React + TypeScript Project

A modern web application built with React 19, TypeScript, and Vite for blazing-fast development.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher recommended)
- **npm** (version 9.0.0 or higher) or **yarn**

To check your current versions, run:

```bash
node --version
npm --version
```

If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/).

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone <repository-url>
cd vite-project
```

### 2. Install dependencies

Install all required packages using npm:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

This will install:
- React 19 and React DOM
- TypeScript and type definitions
- Vite build tool
- ESLint for code linting
- Babel React Compiler plugin
- Other development dependencies

### 3. Start the development server

Launch the development server with hot module replacement:

```bash
npm run dev
```

The application will start and be accessible at:

```
http://localhost:5173
```

Vite will automatically open your default browser. If not, manually navigate to the URL above.

## Available Scripts

The following scripts are available in the project:

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement. The server will automatically reload when you make changes to the source code.

### Build

```bash
npm run build
```

Compiles TypeScript and builds the application for production. The output will be in the `dist` directory. This command:
1. Runs the TypeScript compiler (`tsc -b`)
2. Bundles the application using Vite

### Lint

```bash
npm run lint
```

Runs ESLint to check your code for potential errors and style issues. This helps maintain code quality and consistency.

### Preview

```bash
npm run preview
```

Serves the production build locally for testing. Run this after `npm run build` to preview how your application will work in production.

## Project Structure

```
.
├── src/                  # Source code
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── pages/           # Page components
│   ├── App.tsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Public static files
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## Technology Stack

- **React 19.1.1** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.7** - Build tool and dev server
- **ESLint** - Code linting
- **Babel React Compiler** - Optimizes React components

## Troubleshooting

### Port already in use

If port 5173 is already in use, Vite will automatically try the next available port. Check the console output for the actual URL.

### Dependencies installation fails

Try clearing the npm cache and reinstalling:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build errors

Ensure all TypeScript errors are resolved:

```bash
npm run lint
```

Fix any reported issues before building.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and not licensed for public use.
