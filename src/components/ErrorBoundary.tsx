import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: '#d32f2f', marginBottom: '16px' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ color: '#666', marginBottom: '24px', maxWidth: '600px' }}>
            We're sorry for the inconvenience. An unexpected error has occurred.
            Please try refreshing the page or contact support if the problem persists.
          </p>
          {this.state.error && (
            <details style={{ marginBottom: '24px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#1976d2' }}>
                Error details
              </summary>
              <pre
                style={{
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '14px',
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <div>
            <button
              onClick={this.handleReset}
              style={{
                padding: '10px 24px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '12px',
                fontSize: '16px',
              }}
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 24px',
                backgroundColor: '#757575',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
