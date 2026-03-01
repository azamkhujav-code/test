import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { errorLogger } from './utils/errorLogger.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary onError={(error, errorInfo) => errorLogger.log(error, errorInfo)}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
