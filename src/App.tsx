import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user', { withCredentials: true });
        setUser(response.data.email);
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
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
