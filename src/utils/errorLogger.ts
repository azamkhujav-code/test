import type { ErrorInfo } from 'react';

interface ErrorLog {
  timestamp: string;
  error: string;
  errorInfo: string;
  userAgent: string;
  url: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 50;

  logError(error: Error, errorInfo: ErrorInfo): void {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      error: error.toString(),
      errorInfo: errorInfo.componentStack || '',
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Add to in-memory logs
    this.logs.unshift(errorLog);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.group('Error Logged');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Timestamp:', errorLog.timestamp);
      console.groupEnd();
    }

    // In production, you would send this to an error tracking service
    // Example: Sentry, LogRocket, or custom backend
    this.sendToErrorTrackingService(errorLog);
  }

  private sendToErrorTrackingService(errorLog: ErrorLog): void {
    // Placeholder for sending errors to a tracking service
    // In production, implement actual error reporting here
    if (!import.meta.env.DEV) {
      // Example: fetch('/api/log-error', { method: 'POST', body: JSON.stringify(errorLog) })
      console.log('Error would be sent to tracking service:', errorLog);
    }
  }

  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

// Export a singleton instance
export const errorLogger = new ErrorLogger();

// Export the class for testing purposes
export default ErrorLogger;
