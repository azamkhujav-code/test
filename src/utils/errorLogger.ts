import type { ErrorInfo } from 'react';

interface ErrorLog {
  error: Error;
  errorInfo: ErrorInfo | null;
  timestamp: string;
  userAgent: string;
  url: string;
}

/**
 * Error logging utility to track and report errors
 * In production, this could send errors to a service like Sentry, LogRocket, etc.
 */
class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 50; // Keep only the last 50 errors in memory

  /**
   * Log an error with context information
   */
  log(error: Error, errorInfo: ErrorInfo | null = null): void {
    const errorLog: ErrorLog = {
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Add to in-memory logs
    this.logs.push(errorLog);

    // Keep only the most recent errors
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.group('Error Logged:');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.log('Timestamp:', errorLog.timestamp);
      console.log('URL:', errorLog.url);
      console.groupEnd();
    }

    // In production, send to error tracking service
    this.sendToErrorTrackingService(errorLog);
  }

  /**
   * Send error to external error tracking service
   * Replace this with actual service integration (Sentry, LogRocket, etc.)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private sendToErrorTrackingService(_errorLog: ErrorLog): void {
    // This is a placeholder for production error tracking
    // In a real app, you would send this to a service like:
    // - Sentry.captureException(_errorLog.error)
    // - LogRocket.captureException(_errorLog.error)
    // - Custom API endpoint
    
    if (!import.meta.env.DEV) {
      // Example: Send to custom endpoint
      // fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     message: _errorLog.error.message,
      //     stack: _errorLog.error.stack,
      //     componentStack: _errorLog.errorInfo?.componentStack,
      //     timestamp: _errorLog.timestamp,
      //     url: _errorLog.url,
      //     userAgent: _errorLog.userAgent,
      //   }),
      // }).catch(err => console.error('Failed to log error:', err));
    }
  }

  /**
   * Get all logged errors
   */
  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  /**
   * Clear all logged errors
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Get the most recent error
   */
  getLastError(): ErrorLog | null {
    return this.logs.length > 0 ? this.logs[this.logs.length - 1] : null;
  }
}

// Export a singleton instance
export const errorLogger = new ErrorLogger();

// Export the class for testing purposes
export default ErrorLogger;
