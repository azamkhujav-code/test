# React + TypeScript + Vite

This project is a modern React application built with TypeScript and Vite, featuring React 19 with the React Compiler for optimized performance.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.x or higher recommended)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

You can verify your installation by running:

```bash
node --version
npm --version
```

### Step-by-Step Setup

1. **Clone the repository** (if you haven't already):

```bash
git clone <your-repository-url>
cd vite-project
```

2. **Install dependencies**:

Using npm:
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
- ESLint with React plugins
- React Compiler (Babel plugin)

### Development

#### Starting the Development Server

To start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at:
- Local: `http://localhost:5173`
- Network: `http://<your-ip>:5173`

The development server will automatically reload when you make changes to your code.

#### Linting

To check your code for linting errors:

```bash
npm run lint
```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This command will:
1. Run TypeScript compiler checks (`tsc -b`)
2. Build the application using Vite
3. Output the production-ready files to the `dist` directory

#### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

This will start a local server to preview the built application.

## Project Structure

```
vite-project/
├── src/              # Source files
│   ├── assets/       # Static assets
│   ├── pages/        # Page components
│   ├── App.tsx       # Main application component
│   ├── App.css       # Application styles
│   ├── main.tsx      # Application entry point
│   └── index.css     # Global styles
├── public/           # Public static files
├── index.html        # HTML template
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── eslint.config.js  # ESLint configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build the application for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## Technology Stack

- **React 19.1.1** - UI library with latest features
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.7** - Fast build tool and dev server
- **React Compiler** - Automatic optimization of React components
- **ESLint** - Code quality and style checking

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a custom port:

```bash
npm run dev -- --port 3000
```

### Node Version Issues

If you encounter errors related to Node.js version, ensure you're using Node.js 18.x or higher. Consider using a version manager like `nvm` (Node Version Manager):

```bash
nvm install 18
nvm use 18
```

### Dependency Installation Failures

If you encounter issues during `npm install`:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete `node_modules` and `package-lock.json`:
```bash
rm -rf node_modules package-lock.json
```

3. Reinstall dependencies:
```bash
npm install
```

### TypeScript Errors

If you see TypeScript errors, ensure all type definitions are installed:

```bash
npm install --save-dev @types/react @types/react-dom @types/node
```

## Contributing

Contributions are welcome! Please ensure your code:
- Passes all ESLint checks (`npm run lint`)
- Builds successfully (`npm run build`)
- Follows the existing code style and conventions

## License

This project is private and not licensed for public use.