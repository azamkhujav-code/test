import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state from localStorage only once on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedEmail = localStorage.getItem('userEmail');
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        
        if (storedEmail && isLoggedIn) {
          setUser(storedEmail);
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = (email: string) => {
    try {
      // Update state first for immediate UI response
      setUser(email);
      
      // Then persist to localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('loggedIn', 'true');
    } catch (error) {
      console.error('Failed to persist login state:', error);
      // Optionally handle storage quota exceeded or other errors
    }
  };

  const logout = () => {
    try {
      // Update state first for immediate UI response
      setUser(null);
      
      // Then clean up localStorage
      localStorage.removeItem('userEmail');
      localStorage.removeItem('loggedIn');
    } catch (error) {
      console.error('Failed to clear login state:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  // Don't render children until auth state is initialized to prevent flash of wrong content
  if (!isInitialized) {
    return null; // Or a loading spinner if desired
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
