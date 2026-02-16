/**
 * User Action Monitoring Utility
 * 
 * Provides event tracking capabilities for monitoring user actions
 * such as login, logout, and other user interactions.
 */

export const UserAction = {
  LOGIN: 'USER_LOGIN',
  LOGOUT: 'USER_LOGOUT',
  LOGIN_FAILED: 'USER_LOGIN_FAILED',
} as const;

export type UserAction = typeof UserAction[keyof typeof UserAction];

export interface UserActionEvent {
  action: UserAction;
  timestamp: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface MonitoringConfig {
  enabled: boolean;
  logToConsole: boolean;
  sendToAnalytics: boolean;
}

class UserActionMonitor {
  private config: MonitoringConfig;
  private events: UserActionEvent[] = [];

  constructor(config: Partial<MonitoringConfig> = {}) {
    this.config = {
      enabled: true,
      logToConsole: true,
      sendToAnalytics: false,
      ...config,
    };
  }

  /**
   * Track a user action event
   */
  track(action: UserAction, userId?: string, metadata?: Record<string, unknown>): void {
    if (!this.config.enabled) return;

    const event: UserActionEvent = {
      action,
      timestamp: new Date().toISOString(),
      userId,
      metadata,
    };

    this.events.push(event);

    if (this.config.logToConsole) {
      this.logToConsole(event);
    }

    if (this.config.sendToAnalytics) {
      this.sendToAnalytics(event);
    }
  }

  /**
   * Log event to console with formatted output
   */
  private logToConsole(event: UserActionEvent): void {
    const { action, timestamp, userId, metadata } = event;
    console.group(`[USER ACTION] ${action}`);
    console.log('Timestamp:', timestamp);
    if (userId) console.log('User ID:', userId);
    if (metadata) console.log('Metadata:', metadata);
    console.groupEnd();
  }

  /**
   * Send event to analytics service
   * This is a placeholder for integration with services like Google Analytics,
   * Mixpanel, Amplitude, etc.
   */
  private sendToAnalytics(event: UserActionEvent): void {
    // Placeholder for analytics integration
    // Example: window.gtag?.('event', event.action, { ...event });
    console.log('[Analytics] Event sent:', event);
  }

  /**
   * Get all tracked events
   */
  getEvents(): UserActionEvent[] {
    return [...this.events];
  }

  /**
   * Get events filtered by action type
   */
  getEventsByAction(action: UserAction): UserActionEvent[] {
    return this.events.filter(e => e.action === action);
  }

  /**
   * Get events filtered by user ID
   */
  getEventsByUser(userId: string): UserActionEvent[] {
    return this.events.filter(e => e.userId === userId);
  }

  /**
   * Clear all tracked events
   */
  clearEvents(): void {
    this.events = [];
  }

  /**
   * Update monitoring configuration
   */
  updateConfig(config: Partial<MonitoringConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): MonitoringConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const userActionMonitor = new UserActionMonitor();

// Export class for custom instances
export default UserActionMonitor;
