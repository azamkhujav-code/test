# User Action Monitoring System

This application now includes a comprehensive monitoring system for tracking user actions, specifically login and logout events. The monitoring system provides valuable insights into user behavior and helps identify potential issues or bottlenecks in the user experience.

## Features

### Event Tracking
- **Login Events**: Tracks successful user logins with email and device metadata
- **Logout Events**: Tracks user logouts with session duration
- **Failed Login Events**: Tracks failed login attempts with error details

### Device Detection
- Browser detection (Chrome, Firefox, Safari)
- Device type detection (mobile, tablet, desktop)
- User agent information

### Session Tracking
- Session duration calculation
- Timestamp for all events
- User identification

## Architecture

### Core Components

#### 1. Monitoring Utility (`src/utils/monitoring.ts`)
The `UserActionMonitor` class provides the core tracking functionality:
- Event logging to console with formatted output
- Event storage and retrieval
- Configurable monitoring options
- Analytics integration placeholder

```typescript
import { userActionMonitor, UserAction } from './utils/monitoring';

// Track a login event
userActionMonitor.track(UserAction.LOGIN, 'user@example.com', {
  loginMethod: 'email',
  deviceInfo: { browser: 'Chrome', deviceType: 'desktop' }
});
```

#### 2. TypeScript Types (`src/types/monitoring.ts`)
Strongly-typed interfaces for all monitoring events:
- `LoginMetadata`: Login event metadata
- `LogoutMetadata`: Logout event metadata
- `LoginFailedMetadata`: Failed login metadata
- `UseMonitoring`: Hook return type

#### 3. Monitoring Context (`src/contexts/MonitoringContext.tsx`)
React Context Provider for app-wide monitoring access:
```typescript
import { useMonitoring } from './contexts/MonitoringContext';

const { trackLogin, trackLogout, trackLoginFailed } = useMonitoring();
```

## Usage

### Automatic Tracking
Monitoring is automatically integrated into the application:
- Login events are tracked in `Login.tsx` when users successfully log in
- Failed login attempts are tracked when validation fails
- Logout events are tracked in `App.tsx` when users sign out

### Console Output
All events are logged to the browser console with formatted output:
```
[USER ACTION] USER_LOGIN
  Timestamp: 2026-02-16T11:58:00.000Z
  User ID: user@example.com
  Metadata: {
    loginMethod: 'email',
    deviceInfo: { browser: 'Chrome', deviceType: 'desktop' }
  }
```

### Event Data Structure
Each event contains:
- `action`: Event type (LOGIN, LOGOUT, LOGIN_FAILED)
- `timestamp`: ISO 8601 timestamp
- `userId`: User identifier (email)
- `metadata`: Additional event-specific data

### Session Duration
Session duration is automatically calculated:
- Starts when user logs in
- Ends when user logs out
- Included in logout event metadata

## Configuration

The monitoring system can be configured via the `UserActionMonitor` constructor:

```typescript
import UserActionMonitor from './utils/monitoring';

const monitor = new UserActionMonitor({
  enabled: true,           // Enable/disable monitoring
  logToConsole: true,      // Log events to console
  sendToAnalytics: false,  // Send to analytics service
});
```

## Future Enhancements

### Analytics Integration
The monitoring system includes a placeholder for analytics integration. You can integrate with services like:
- Google Analytics
- Mixpanel
- Amplitude
- Custom analytics endpoints

To enable analytics:
1. Update the `sendToAnalytics` method in `monitoring.ts`
2. Set `sendToAnalytics: true` in the configuration
3. Implement your analytics service integration

Example:
```typescript
private sendToAnalytics(event: UserActionEvent): void {
  // Google Analytics example
  window.gtag?.('event', event.action, {
    event_category: 'user_action',
    event_label: event.userId,
    ...event.metadata
  });
}
```

### Additional Events
You can easily extend the system to track more events:
1. Add new action types to `UserAction` in `monitoring.ts`
2. Create corresponding metadata types in `types/monitoring.ts`
3. Track events where needed in your components

## Testing

To test the monitoring system:
1. Start the dev server: `npm run dev`
2. Open the browser console
3. Try logging in with any email and password
4. Observe the console output for LOGIN events
5. Click "Sign out" and observe LOGOUT events
6. Try submitting the login form without credentials to see LOGIN_FAILED events

## API Reference

### UserActionMonitor Methods

- `track(action, userId?, metadata?)`: Track a user action event
- `getEvents()`: Get all tracked events
- `getEventsByAction(action)`: Get events filtered by action type
- `getEventsByUser(userId)`: Get events filtered by user ID
- `clearEvents()`: Clear all tracked events
- `updateConfig(config)`: Update monitoring configuration
- `getConfig()`: Get current configuration

### useMonitoring Hook

Returns an object with:
- `trackLogin(userId, metadata?)`: Track login event
- `trackLogout(userId?, metadata?)`: Track logout event
- `trackLoginFailed(metadata?)`: Track failed login event
- `getEvents()`: Get all events
- `clearEvents()`: Clear all events

## Security Considerations

- User passwords are NEVER logged or tracked
- Only user email addresses are tracked (as userId)
- All monitoring data is stored in memory (not persisted)
- No sensitive information is included in event metadata

## Performance

The monitoring system is designed to be lightweight:
- Minimal performance impact
- Non-blocking event tracking
- In-memory event storage
- Configurable (can be disabled if needed)
