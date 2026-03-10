import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { getCookie } from './utils/cookies';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by reading the userEmail cookie
    const userEmail = getCookie('userEmail');
    if (userEmail) {
      setUser(userEmail);
    }
    setLoading(false);
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = async () => {
    try {
      // Call logout API to clear HttpOnly cookies server-side
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return <div className="App"><p>Loading...</p></div>;
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
