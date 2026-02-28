import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import ErrorFallback from './components/ErrorFallback.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      componentName="Application"
      fallback={(error, resetError) => (
        <ErrorFallback 
          error={error} 
          resetError={resetError} 
          componentName="Application"
        />
      )}
      onError={(error, errorInfo) => {
        // Additional custom error handling at root level
        console.error('Root ErrorBoundary caught error:', error, errorInfo);
        // The errorLogger.log is already called in componentDidCatch
      }}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
