import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Types and Interfaces
export interface User {
  email: string;
  loggedIn: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Storage keys
const STORAGE_KEYS = {
  USER_EMAIL: 'userEmail',
  LOGGED_IN: 'loggedIn',
} as const;

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
        const storedLoggedIn = localStorage.getItem(STORAGE_KEYS.LOGGED_IN);

        if (storedEmail && storedLoggedIn === 'true') {
          setUser({
            email: storedEmail,
            loggedIn: true,
          });
        }
      } catch (err) {
        console.error('Error initializing auth state:', err);
        setError('Failed to restore authentication state');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Simulate authentication (replace with actual API call)
      // In a real app, this would make an API request to validate credentials
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create user object
      const newUser: User = {
        email,
        loggedIn: true,
      };

      // Update state
      setUser(newUser);

      // Persist to localStorage
      localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
      localStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'true');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    try {
      // Clear state
      setUser(null);
      setError(null);

      // Clear localStorage
      localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
      localStorage.removeItem(STORAGE_KEYS.LOGGED_IN);
    } catch (err) {
      console.error('Error during logout:', err);
      setError('Failed to logout properly');
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user?.loggedIn,
    isLoading,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
