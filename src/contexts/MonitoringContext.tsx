/**
 * Monitoring Context Provider
 * 
 * Provides app-wide access to monitoring utilities via React Context
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { userActionMonitor, UserAction } from '../utils/monitoring';
import type { 
  UseMonitoring, 
  LoginMetadata, 
  LogoutMetadata, 
  LoginFailedMetadata 
} from '../types/monitoring';

const MonitoringContext = createContext<UseMonitoring | undefined>(undefined);

interface MonitoringProviderProps {
  children: ReactNode;
}

export const MonitoringProvider: React.FC<MonitoringProviderProps> = ({ children }) => {
  const trackLogin = (userId: string, metadata?: LoginMetadata) => {
    userActionMonitor.track(UserAction.LOGIN, userId, metadata);
  };

  const trackLogout = (userId?: string, metadata?: LogoutMetadata) => {
    userActionMonitor.track(UserAction.LOGOUT, userId, metadata);
  };

  const trackLoginFailed = (metadata?: LoginFailedMetadata) => {
    userActionMonitor.track(UserAction.LOGIN_FAILED, undefined, metadata);
  };

  const getEvents = () => {
    return userActionMonitor.getEvents();
  };

  const clearEvents = () => {
    userActionMonitor.clearEvents();
  };

  const value: UseMonitoring = {
    trackLogin,
    trackLogout,
    trackLoginFailed,
    getEvents,
    clearEvents,
  };

  return (
    <MonitoringContext.Provider value={value}>
      {children}
    </MonitoringContext.Provider>
  );
};

/**
 * Custom hook to access monitoring functionality
 * 
 * @example
 * const { trackLogin, trackLogout } = useMonitoring();
 * trackLogin('user@example.com', { loginMethod: 'email' });
 */
export const useMonitoring = (): UseMonitoring => {
  const context = useContext(MonitoringContext);
  if (context === undefined) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
};

export default MonitoringContext;
