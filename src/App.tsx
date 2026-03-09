import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { post } from './utils/apiUtils';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await post('/api/check-session', {});
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to check session:', error);
      }
    };

    checkSession();
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = async () => {
    try {
      await post('/api/logout', {});
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
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
