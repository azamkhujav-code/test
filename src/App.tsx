import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { validateCSRFToken } from './utils/csrfUtils';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) setUser(stored);
  }, []);

  const handleLogin = (email: string, csrfToken: string) => {
    if (validateCSRFToken(csrfToken)) {
      setUser(email);
    } else {
      console.error('Invalid CSRF token');
      // Handle invalid CSRF token (e.g., show an error message)
    }
  };

  const handleLogout = (csrfToken: string) => {
    if (validateCSRFToken(csrfToken)) {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userEmail');
      setUser(null);
    } else {
      console.error('Invalid CSRF token');
      // Handle invalid CSRF token (e.g., show an error message)
    }
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
