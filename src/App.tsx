import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { getCurrentUser, logout } from './services/authService';
import './App.css';

/**
 * Main Application Component
 * 
 * SECURITY IMPROVEMENTS:
 * - Session validation on app load using secure tokens
 * - Token-based authentication instead of storing user data in localStorage
 * - Proper logout handling that clears all session data
 * - No plain text password storage anywhere in the application
 */
function App() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // SECURITY: Validate session on app load
    // This checks for a valid session token in sessionStorage
    // instead of trusting localStorage values
    const validateSession = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };

    validateSession();
  }, []);

  const handleLogin = (email: string) => {
    // User is already authenticated by authService
    // Just update the UI state
    setUser(email);
  };

  const handleLogout = () => {
    // SECURITY: Proper logout that clears all session data
    logout();
    setUser(null);
  };

  // Show loading state while validating session
  if (isLoading) {
    return (
      <div className="App">
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
