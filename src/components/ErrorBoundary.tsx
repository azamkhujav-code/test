import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { errorLogger } from '../utils/errorLogger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, resetError: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number | null>;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error using centralized error logger
    errorLogger.log(error, errorInfo, this.props.componentName);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset error boundary when resetKeys change
    if (this.state.hasError && this.props.resetKeys) {
      const prevKeys = prevProps.resetKeys || [];
      const currentKeys = this.props.resetKeys;
      
      if (prevKeys.length !== currentKeys.length || 
          prevKeys.some((key, index) => key !== currentKeys[index])) {
        this.resetErrorBoundary();
      }
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // If custom fallback is provided
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error, this.resetErrorBoundary);
        }
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '2px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          color: '#d63031',
        }}>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Error details
            </summary>
            <p style={{ marginTop: '10px', fontFamily: 'monospace', fontSize: '14px' }}>
              {this.state.error.toString()}
            </p>
            {this.state.error.stack && (
              <pre style={{ 
                marginTop: '10px', 
                padding: '10px', 
                backgroundColor: '#fff',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
              }}>
                {this.state.error.stack}
              </pre>
            )}
          </details>
          <button
            onClick={this.resetErrorBoundary}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#d63031',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
