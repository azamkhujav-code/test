import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { apiRequest, refreshCsrfToken } from './utils/api';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) setUser(stored);
    refreshCsrfToken();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await apiRequest('/api/login', 'POST', { email, password });
      if (data.success) {
        setUser(email);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const data = await apiRequest('/api/logout', 'POST');
      if (data.success) {
        setUser(null);
      }
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
