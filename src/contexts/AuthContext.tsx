import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the shape of the user object
interface User {
  email: string;
}

// Define the shape of the auth state
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Define the shape of the auth context
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 15; // 15 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const logout = useCallback(() => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginTime');
    setAuthState(prevState => ({ ...prevState, user: null, error: null }));
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const currentTime = new Date().getTime();
        if (currentTime - parseInt(loginTime, 10) > TOKEN_EXPIRATION_TIME) {
          logout();
        }
      }
    };

    const storedUser = localStorage.getItem('userEmail');
    if (storedUser) {
      setAuthState(prevState => ({
        ...prevState,
        user: { email: storedUser },
        isLoading: false,
      }));
      checkTokenExpiration();
    } else {
      setAuthState(prevState => ({ ...prevState, isLoading: false }));
    }

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [logout]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password === 'password') { // This is just for demonstration. In a real app, you'd validate against a backend.
        localStorage.setItem('userEmail', email);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('loginTime', new Date().getTime().toString());
        setAuthState(prevState => ({
          ...prevState,
          user: { email },
          error: null,
        }));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setAuthState(prevState => ({
        ...prevState,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};