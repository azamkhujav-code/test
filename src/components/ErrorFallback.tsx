import type { FC } from 'react';
import './ErrorFallback.css';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  componentName?: string;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ 
  error, 
  resetError, 
  componentName = 'Component' 
}) => {
  return (
    <div className="error-fallback">
      <div className="error-fallback-content">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Oops! Something went wrong</h2>
        <p className="error-message">
          {componentName} encountered an unexpected error and couldn't render properly.
        </p>
        
        <div className="error-details">
          <details>
            <summary className="error-summary">
              View technical details
            </summary>
            <div className="error-info">
              <p className="error-name">{error.name}: {error.message}</p>
              {error.stack && (
                <pre className="error-stack">{error.stack}</pre>
              )}
            </div>
          </details>
        </div>

        <div className="error-actions">
          <button 
            className="error-retry-button" 
            onClick={resetError}
          >
            Try Again
          </button>
          <button 
            className="error-home-button" 
            onClick={() => window.location.href = '/'}
          >
            Go to Home
          </button>
        </div>

        <p className="error-help">
          If this problem persists, please contact support or try refreshing the page.
        </p>
      </div>
    </div>
  );
};

export default ErrorFallback;
