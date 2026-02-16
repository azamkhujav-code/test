import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MonitoringProvider } from './contexts/MonitoringContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MonitoringProvider>
      <App />
    </MonitoringProvider>
  </StrictMode>,
)
