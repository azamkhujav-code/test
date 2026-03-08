import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
// Task 3 completed: App wired login flow with Login/Home components
import Home from './pages/Home';
import './App.css';
import { LOCAL_STORAGE_KEYS } from './constants/localStorage';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_EMAIL);
    if (stored) setUser(stored);
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGGED_IN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_EMAIL);
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
