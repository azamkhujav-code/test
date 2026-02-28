/**
 * Error logging utility for tracking and reporting errors
 */
import type { ErrorInfo } from 'react';

export interface ErrorLog {
  timestamp: string;
  error: Error;
  errorInfo?: ErrorInfo;
  componentName?: string;
  userAgent: string;
  url: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 50; // Keep last 50 errors in memory

  /**
   * Log an error with contextual information
   */
  log(
    error: Error,
    errorInfo?: ErrorInfo,
    componentName?: string
  ): void {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } as Error,
      errorInfo,
      componentName,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Add to in-memory logs
    this.logs.unshift(errorLog);
    
    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.group(`🔴 Error logged: ${componentName || 'Unknown Component'}`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Full Log:', errorLog);
      console.groupEnd();
    }

    // In production, send to error tracking service
    // This is where you would integrate with services like:
    // - Sentry
    // - LogRocket
    // - Bugsnag
    // - Custom analytics endpoint
    if (import.meta.env.PROD) {
      this.sendToErrorService(errorLog);
    }

    // Store in localStorage for debugging (last 10 errors)
    try {
      const storedErrors = this.getStoredErrors();
      storedErrors.unshift(errorLog);
      localStorage.setItem(
        'app_error_logs',
        JSON.stringify(storedErrors.slice(0, 10))
      );
    } catch (e) {
      // If localStorage is full or unavailable, fail silently
      console.warn('Failed to store error in localStorage:', e);
    }
  }

  /**
   * Get all errors from memory
   */
  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  /**
   * Get errors from localStorage
   */
  getStoredErrors(): ErrorLog[] {
    try {
      const stored = localStorage.getItem('app_error_logs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Clear all error logs
   */
  clearLogs(): void {
    this.logs = [];
    try {
      localStorage.removeItem('app_error_logs');
    } catch (e) {
      console.warn('Failed to clear error logs from localStorage:', e);
    }
  }

  /**
   * Send error to external error tracking service
   */
  private sendToErrorService(errorLog: ErrorLog): void {
    // Example implementation - replace with your error tracking service
    // For example, with Sentry:
    // Sentry.captureException(errorLog.error, {
    //   contexts: {
    //     react: errorLog.errorInfo,
    //     component: { name: errorLog.componentName },
    //   },
    //   tags: {
    //     url: errorLog.url,
    //   },
    // });

    // For now, just log that we would send it
    console.log('[Production] Would send error to tracking service:', {
      message: errorLog.error.message,
      component: errorLog.componentName,
      timestamp: errorLog.timestamp,
    });
  }

  /**
   * Get error statistics
   */
  getStats(): {
    total: number;
    byComponent: Record<string, number>;
    recent: ErrorLog[];
  } {
    const byComponent: Record<string, number> = {};
    
    this.logs.forEach((log) => {
      const component = log.componentName || 'Unknown';
      byComponent[component] = (byComponent[component] || 0) + 1;
    });

    return {
      total: this.logs.length,
      byComponent,
      recent: this.logs.slice(0, 5),
    };
  }
}

// Export singleton instance
export const errorLogger = new ErrorLogger();

// Export for testing purposes
export default errorLogger;
