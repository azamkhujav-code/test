# Error Boundary Testing Guide

This guide provides instructions for testing the error boundary implementation.

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open the application** in your browser (typically http://localhost:5173)

## Testing Scenarios

### Scenario 1: Test Error Boundary with Demo Component

To add the demo component for testing, modify `src/pages/Home.tsx`:

```tsx
import BuggyComponent from '../components/ErrorBoundaryDemo';

const Home = ({ user, onLogout }: Props) => {
  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <BuggyComponent />
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};
```

Then:
1. Log in to the application
2. Click the "Trigger Error" button in the BuggyComponent
3. Verify that the error boundary catches the error
4. Verify the fallback UI is displayed
5. Click "Try again" to reset the error
6. Verify the component recovers

### Scenario 2: Simulate Component Error Manually

Add a temporary error to any component:

```tsx
const Home = ({ user, onLogout }: Props) => {
  // Uncomment to test error boundary
  // throw new Error('Test error from Home component');
  
  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};
```

### Scenario 3: Test Page-Level Error Isolation

1. Add an error to the Login component
2. Verify only the Login page shows the error fallback
3. Fix the error and verify you can navigate to Home
4. Add an error to the Home component
5. Verify only the Home page shows the error fallback
6. Verify login functionality still works

### Scenario 4: Test Application Root Error Boundary

Temporarily add an error to App.tsx (outside the page components):

```tsx
function App() {
  // Uncomment to test root error boundary
  // throw new Error('Test error from App root');
  
  const [user, setUser] = useState<string | null>(null);
  // ... rest of component
}
```

This will trigger the root-level error boundary.

## Expected Behavior

### When Error Occurs:
1. Error boundary catches the error
2. Fallback UI is displayed with:
   - Error message heading
   - Component name that errored
   - Collapsible error details
   - "Try again" button
3. Error is logged to console
4. Rest of application remains functional

### When "Try Again" is Clicked:
1. Error state is reset
2. Component attempts to re-render
3. If error condition is fixed, component renders normally
4. If error persists, fallback UI is displayed again

## Error Boundary Hierarchy

```
Application Root (main.tsx)
└── ErrorBoundary (catches all errors)
    └── App
        ├── ErrorBoundary (Login Page)
        │   └── Login Component
        └── ErrorBoundary (Home Page)
            └── Home Component
```

## Verification Checklist

- [ ] Build completes successfully: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Dev server starts: `npm run dev`
- [ ] Login page renders without errors
- [ ] Home page renders without errors
- [ ] Triggered errors are caught by error boundaries
- [ ] Fallback UI displays correctly
- [ ] Error details are shown in console
- [ ] "Try again" button resets error state
- [ ] Error in one page doesn't crash entire app
- [ ] Styling matches application theme

## Production Considerations

In production, you should:

1. **Integrate with Error Tracking Service**:
   ```tsx
   <ErrorBoundary
     onError={(error, errorInfo) => {
       // Send to Sentry, LogRocket, etc.
       errorTrackingService.captureException(error, { errorInfo });
     }}
   >
   ```

2. **Custom Error Messages**:
   - Show user-friendly messages in production
   - Hide technical details from end users
   - Provide contact information or support links

3. **Error Recovery Strategies**:
   - Implement automatic retry logic
   - Save user state before errors occur
   - Provide alternative navigation paths

4. **Monitoring**:
   - Track error frequency and patterns
   - Set up alerts for critical errors
   - Monitor error recovery success rates

## Common Issues

### Error Boundaries Don't Catch:
- Event handler errors (use try-catch)
- Async errors (use Promise.catch or async/await try-catch)
- Server-side rendering errors
- Errors in error boundary itself

### For These Cases:
Use traditional error handling:

```tsx
// Event handlers
const handleClick = () => {
  try {
    // risky operation
  } catch (error) {
    // handle error
  }
};

// Async operations
const fetchData = async () => {
  try {
    await riskyAsyncOperation();
  } catch (error) {
    // handle error
  }
};
```

## Resources

- React Error Boundaries Documentation: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
- Error Boundary Best Practices: https://react.dev/learn/error-boundaries
- Project Documentation: See README_ERROR_BOUNDARIES.md for detailed implementation notes
