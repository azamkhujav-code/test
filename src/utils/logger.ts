/**
 * User Action Logger
 * Logs user interactions securely without exposing sensitive information
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  action: string;
  details?: Record<string, unknown>;
}

/**
 * Sanitizes sensitive information from user data
 * - Masks email addresses (shows only first 2 chars and domain)
 * - Removes password fields entirely
 * - Redacts any sensitive keys
 */
function sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'accessToken'];

  for (const [key, value] of Object.entries(data)) {
    // Remove sensitive fields entirely
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
      continue;
    }

    // Mask email addresses
    if (key === 'email' && typeof value === 'string') {
      sanitized[key] = maskEmail(value);
      continue;
    }

    // For nested objects, recursively sanitize
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeData(value as Record<string, unknown>);
      continue;
    }

    sanitized[key] = value;
  }

  return sanitized;
}

/**
 * Masks an email address to show only first 2 characters and domain
 * Example: user@example.com -> us***@example.com
 */
function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!domain || localPart.length < 2) {
    return '***@***';
  }
  const maskedLocal = localPart.substring(0, 2) + '***';
  return `${maskedLocal}@${domain}`;
}

/**
 * Formats a log entry for output
 */
function formatLog(entry: LogEntry): string {
  const detailsStr = entry.details 
    ? ` | ${JSON.stringify(entry.details)}` 
    : '';
  return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.action}${detailsStr}`;
}

/**
 * Logs a user action with optional details
 * Automatically sanitizes any sensitive information
 */
function logUserAction(
  action: string,
  level: LogLevel = 'info',
  details?: Record<string, unknown>
): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    action,
    details: details ? sanitizeData(details) : undefined,
  };

  const formattedLog = formatLog(entry);

  // In development, log to console
  // In production, this could be sent to a logging service
  switch (level) {
    case 'error':
      console.error(formattedLog);
      break;
    case 'warn':
      console.warn(formattedLog);
      break;
    default:
      console.log(formattedLog);
  }

  // Optional: Store logs in localStorage for debugging (with size limits)
  storeLog(entry);
}

/**
 * Stores log entries in localStorage with size management
 * Keeps only the last 100 entries to prevent storage bloat
 */
function storeLog(entry: LogEntry): void {
  try {
    const storageKey = 'user_action_logs';
    const existingLogs = localStorage.getItem(storageKey);
    const logs: LogEntry[] = existingLogs ? JSON.parse(existingLogs) : [];
    
    logs.push(entry);
    
    // Keep only last 100 entries
    const trimmedLogs = logs.slice(-100);
    
    localStorage.setItem(storageKey, JSON.stringify(trimmedLogs));
  } catch (error) {
    // Silent fail if localStorage is unavailable or full
    console.warn('Failed to store log entry:', error);
  }
}

/**
 * Retrieves stored logs from localStorage
 */
function getStoredLogs(): LogEntry[] {
  try {
    const storageKey = 'user_action_logs';
    const existingLogs = localStorage.getItem(storageKey);
    return existingLogs ? JSON.parse(existingLogs) : [];
  } catch (error) {
    console.warn('Failed to retrieve logs:', error);
    return [];
  }
}

/**
 * Clears all stored logs from localStorage
 */
function clearLogs(): void {
  try {
    localStorage.removeItem('user_action_logs');
    console.log('Logs cleared successfully');
  } catch (error) {
    console.warn('Failed to clear logs:', error);
  }
}

export { logUserAction, getStoredLogs, clearLogs };
export type { LogEntry, LogLevel };
