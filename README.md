# Vite + React Project

A modern React application built with Vite, TypeScript, and React 19.

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Architecture Decision Records (ADRs)

This section documents the key architectural decisions made during the development of this project. Understanding these decisions will help future developers maintain and extend the application effectively.

### ADR-001: Build Tool - Vite

**Status:** Accepted

**Context:**
The project needed a modern build tool that provides fast development experience, optimal production builds, and first-class TypeScript support.

**Decision:**
We chose Vite as our build tool and development server.

**Rationale:**
- Lightning-fast Hot Module Replacement (HMR) during development
- Native ES modules support for faster development builds
- Optimized production builds using Rollup
- Excellent TypeScript support out of the box
- Smaller configuration overhead compared to webpack
- Growing ecosystem and community support

**Consequences:**
- Positive: Significantly faster development experience with instant HMR
- Positive: Simplified build configuration
- Positive: Better developer experience with faster startup times
- Neutral: Requires modern browser support for development (ES modules)

### ADR-002: Frontend Framework - React 19

**Status:** Accepted

**Context:**
The application required a robust, component-based UI framework with strong community support and modern features.

**Decision:**
We adopted React 19 as the frontend framework.

**Rationale:**
- Latest React version with improved performance and features
- Mature ecosystem with extensive third-party libraries
- Strong TypeScript integration
- Enhanced concurrent rendering capabilities
- Better developer tools and debugging experience
- Industry-standard with large talent pool

**Consequences:**
- Positive: Access to latest React features and optimizations
- Positive: Component reusability and maintainability
- Positive: Large community and extensive documentation
- Neutral: Requires learning React paradigms for new developers

### ADR-003: Performance Optimization - React Compiler

**Status:** Accepted

**Context:**
React applications can suffer from unnecessary re-renders, impacting performance. Manual optimization with useMemo and useCallback can be error-prone and time-consuming.

**Decision:**
We integrated the React Compiler (babel-plugin-react-compiler) into our build pipeline.

**Rationale:**
- Automatic memoization of components and values
- Reduces need for manual performance optimization
- Prevents common performance pitfalls
- Official React team solution for optimization
- Forward-compatible with React's direction

**Consequences:**
- Positive: Improved runtime performance with minimal effort
- Positive: Less boilerplate code (fewer useMemo/useCallback)
- Positive: More maintainable codebase
- Negative: Additional build-time overhead (minimal)
- Neutral: Requires understanding of compiler behavior for debugging

**Configuration:**
```javascript
// vite.config.ts
react({
  babel: {
    plugins: [['babel-plugin-react-compiler']],
  },
})
```

### ADR-004: Type Safety - TypeScript with Strict Mode

**Status:** Accepted

**Context:**
The project needed robust type checking to prevent runtime errors and improve code quality, especially as the codebase grows.

**Decision:**
We adopted TypeScript with strict mode enabled and additional safety checks.

**Rationale:**
- Catch errors at compile-time rather than runtime
- Better IDE support with autocomplete and refactoring
- Self-documenting code through type definitions
- Easier refactoring with confidence
- Enhanced developer productivity

**Consequences:**
- Positive: Significantly fewer runtime type errors
- Positive: Better code documentation and maintainability
- Positive: Improved developer experience with IDE support
- Negative: Initial learning curve for TypeScript
- Negative: Some additional development time for type definitions

**Configuration Highlights:**
- Strict mode enabled
- NoUnusedLocals and NoUnusedParameters for cleaner code
- Bundler module resolution for modern imports
- Project references for better build performance

### ADR-005: Code Quality - ESLint with Flat Config

**Status:** Accepted

**Context:**
The project required consistent code quality standards and automatic detection of common issues.

**Decision:**
We implemented ESLint using the new flat config format with TypeScript and React-specific rules.

**Rationale:**
- New flat config format is the future of ESLint
- Simpler configuration and better performance
- React Hooks rules prevent common React mistakes
- React Refresh rules ensure proper HMR behavior
- TypeScript ESLint integration for type-aware linting

**Consequences:**
- Positive: Consistent code style across the project
- Positive: Early detection of potential bugs
- Positive: Better integration with modern tooling
- Positive: Enforces React best practices
- Neutral: Requires developers to address linting issues

**Plugins Used:**
- @eslint/js - Core JavaScript rules
- typescript-eslint - TypeScript-specific rules
- eslint-plugin-react-hooks - React Hooks best practices
- eslint-plugin-react-refresh - Vite HMR compatibility

### ADR-006: Authentication Strategy - LocalStorage-Based Client State

**Status:** Accepted

**Context:**
The application needed a simple authentication mechanism for prototyping and demonstration purposes.

**Decision:**
We implemented client-side authentication using localStorage to persist user session state.

**Rationale:**
- Simple implementation for prototype/demo purposes
- No backend infrastructure required initially
- Quick to implement and test
- Sufficient for demonstrating UI flows
- Easy to replace with real authentication later

**Consequences:**
- Positive: Fast prototyping and development
- Positive: No server-side dependencies for demo
- Negative: NOT suitable for production use (security concerns)
- Negative: Susceptible to XSS attacks
- Negative: No actual credential verification

**Implementation Details:**
- User email stored in localStorage on login
- Session state managed in App component via useState
- useEffect checks localStorage on mount for persistence
- Logout clears localStorage entries

**Future Considerations:**
This is a placeholder implementation. For production, migrate to:
- Token-based authentication (JWT)
- HTTP-only cookies for token storage
- Backend authentication service
- Proper credential verification
- Session management and refresh tokens

### ADR-007: Application Architecture - Component-Based Page Structure

**Status:** Accepted

**Context:**
The application needed a clear separation of concerns and scalable structure for UI components.

**Decision:**
We organized the application using a page-based component architecture with centralized state management in the App component.

**Rationale:**
- Clear separation between pages (Login, Home) and root App
- Single source of truth for authentication state
- Props drilling for simple applications (can scale to context/state management)
- Easy to understand and navigate for new developers
- Supports future addition of routing libraries

**Consequences:**
- Positive: Clear mental model of application structure
- Positive: Easy to add new pages
- Positive: Centralized authentication logic
- Neutral: Props drilling acceptable for current scale
- Future: May need Context API or state management library as app grows

**Structure:**
```
src/
  App.tsx              # Root component, authentication state
  pages/
    Login.tsx          # Login page component
    Home.tsx           # Home page component
  main.tsx             # Application entry point
```

### ADR-008: Module System - ES Modules with Bundler Resolution

**Status:** Accepted

**Context:**
The project needed to leverage modern JavaScript module features while maintaining compatibility with the build system.

**Decision:**
We configured TypeScript to use ES modules with bundler module resolution.

**Rationale:**
- Native browser support for ES modules
- Better tree-shaking in production builds
- Aligns with Vite's native ES module approach
- Faster development builds
- Future-proof module system

**Consequences:**
- Positive: Optimal bundle sizes through tree-shaking
- Positive: Faster development server startup
- Positive: Modern JavaScript standards
- Neutral: Requires understanding of module resolution
- Negative: Limited support for older build tools (not applicable with Vite)

**Configuration:**
```json
{
  "module": "ESNext",
  "moduleResolution": "bundler",
  "moduleDetection": "force"
}
```

## Project Structure

```
vite-project/
├── src/
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── pages/           # Page components
│   │   ├── Login.tsx    # Login page
│   │   └── Home.tsx     # Home page
│   ├── App.tsx          # Root component
│   ├── App.css          # App-specific styles
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Public static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json    # App-specific TS config
├── tsconfig.node.json   # Node-specific TS config
├── eslint.config.js     # ESLint configuration
└── package.json         # Project dependencies and scripts
```

## Contributing

When contributing to this project, please:
1. Follow the existing code style and conventions
2. Ensure all TypeScript types are properly defined
3. Run `npm run lint` before committing
4. Update ADRs when making significant architectural changes
5. Add new ADRs using the format above for major decisions

## License

This project is private and not licensed for external use.