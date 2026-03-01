import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { resetKeys } = this.props;
    const { hasError } = this.state;

    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );

      if (hasChanged) {
        this.reset();
      }
    }
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <div
          style={{
            padding: '2rem',
            margin: '2rem auto',
            maxWidth: '600px',
            backgroundColor: '#fff5f5',
            border: '1px solid #feb2b2',
            borderRadius: '8px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <h2
            style={{
              color: '#c53030',
              fontSize: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              color: '#742a2a',
              marginBottom: '1rem',
            }}
          >
            We're sorry, but an unexpected error occurred. The error has been logged and we'll look into it.
          </p>
          <details
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: '#fff',
              border: '1px solid #fc8181',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <summary
              style={{
                fontWeight: 'bold',
                color: '#9b2c2c',
                marginBottom: '0.5rem',
              }}
            >
              Error Details
            </summary>
            <pre
              style={{
                fontSize: '0.875rem',
                color: '#2d3748',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginTop: '0.5rem',
              }}
            >
              {error?.toString()}
              {errorInfo?.componentStack}
            </pre>
          </details>
          <button
            onClick={this.reset}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#c53030',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#9b2c2c';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#c53030';
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
