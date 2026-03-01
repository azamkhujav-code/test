# Vite Project

A React application built with TypeScript and Vite, featuring a login flow and authentication system.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.x or higher recommended)
- **npm** (comes with Node.js) or **yarn**

To verify your installations, run:

```bash
node --version
npm --version
```

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vite-project
```

### 2. Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

This will install:
- React 19.1.1 and React DOM
- TypeScript and type definitions
- Vite build tool and plugins
- ESLint for code linting
- React Compiler and other development tools

### 3. Start the Development Server

Run the development server:

```bash
npm run dev
```

The application will start and be available at:

```
http://localhost:5173
```

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- TypeScript type checking

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Starts the development server on `http://localhost:5173`

### `npm run build`

Builds the app for production to the `dist` folder:
- Compiles TypeScript
- Optimizes React code
- Bundles and minifies for production

### `npm run preview`

Previews the production build locally

### `npm run lint`

Runs ESLint to check code quality and catch potential errors

## Project Structure

```
vite-project/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── pages/           # Application pages
│       ├── Login.tsx    # Login page
│       └── Home.tsx     # Home page
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Testing the Login Flow

1. Start the development server with `npm run dev`
2. Open `http://localhost:5173` in your browser
3. Enter an email and password on the login form
4. After login, you should see a Welcome page with a Sign out option
5. Click Sign out to return to the login screen

## Technology Stack

- **React** 19.1.1 - UI library
- **TypeScript** 5.9.3 - Type-safe JavaScript
- **Vite** 7.1.7 - Fast build tool and dev server
- **ESLint** 9.36.0 - Code linting
- **React Compiler** - Automatic React optimization

## Development

To contribute to this project:

1. Follow the installation steps above
2. Create a new branch for your feature
3. Make your changes
4. Run `npm run lint` to ensure code quality
5. Run `npm run build` to verify the build works
6. Submit a pull request

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port.

### Dependencies Installation Fails

Try deleting `node_modules` and `package-lock.json`, then run `npm install` again:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Ensure you're using TypeScript version 5.9.3 or compatible. Check your version:

```bash
npx tsc --version
```

## License

This project is private and not licensed for public use.