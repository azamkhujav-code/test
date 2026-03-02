import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  // Initialize user state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) setUser(stored);
  }, []);

  // Update document title based on auth state for better accessibility
  useEffect(() => {
    if (user) {
      document.title = `Home - Welcome ${user}`;
    } else {
      document.title = 'Login - Please sign in';
    }
  }, [user]);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <div className="App" role="application" aria-label="Authentication application">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
