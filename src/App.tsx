import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
import { LoginProps, HomeProps } from './types';

/**
 * Main App component handling authentication state and routing.
 * @returns {JSX.Element} The rendered App component
 */
function App(): JSX.Element {
  const [user, setUser] = useState<string | null>(null);

  /**
   * Effect hook to check for existing user session on component mount.
   */
  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) setUser(stored);
  }, []);

  /**
   * Handles user login by setting the user state and storing in localStorage.
   * @param {string} email - The email of the logged-in user
   */
  const handleLogin: LoginProps['onLogin'] = (email) => {
    setUser(email);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loggedIn', 'true');
  };

  /**
   * Handles user logout by clearing the user state and localStorage.
   */
  const handleLogout: HomeProps['onLogout'] = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

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
