interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  componentName?: string;
}

const ErrorFallback = ({ 
  error, 
  resetError, 
  componentName 
}: ErrorFallbackProps) => {
  return (
    <div className="error-fallback">
      <div className="error-content">
        <h2>Oops! Something went wrong</h2>
        {componentName && (
          <p className="error-component">
            Error occurred in: <strong>{componentName}</strong>
          </p>
        )}
        {error && (
          <details className="error-details">
            <summary>Error details</summary>
            <pre>{error.message}</pre>
          </details>
        )}
        {resetError && (
          <button onClick={resetError} className="error-reset-button">
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;
