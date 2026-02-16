/**
 * TypeScript types for user action monitoring
 */

import { UserAction, UserActionEvent, MonitoringConfig } from '../utils/monitoring';

export type { UserActionEvent, MonitoringConfig };
export { UserAction };

/**
 * Login event metadata
 */
export interface LoginMetadata {
  loginMethod?: 'email' | 'social' | 'sso';
  rememberMe?: boolean;
  deviceInfo?: {
    browser?: string;
    os?: string;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
  };
}

/**
 * Logout event metadata
 */
export interface LogoutMetadata {
  logoutReason?: 'user_initiated' | 'session_timeout' | 'security';
  sessionDuration?: number; // in milliseconds
}

/**
 * Login failed event metadata
 */
export interface LoginFailedMetadata {
  errorCode?: string;
  errorMessage?: string;
  attemptCount?: number;
}

/**
 * Monitoring hook return type
 */
export interface UseMonitoring {
  trackLogin: (userId: string, metadata?: LoginMetadata) => void;
  trackLogout: (userId?: string, metadata?: LogoutMetadata) => void;
  trackLoginFailed: (metadata?: LoginFailedMetadata) => void;
  getEvents: () => UserActionEvent[];
  clearEvents: () => void;
}
