import React, { useEffect, useState, useRef } from 'react';
import Login from './pages/Login';\n// Task 3 completed: App wired login flow with Login/Home components
import Home from './pages/Home';
import './App.css';
import { userActionMonitor, UserAction } from './utils/monitoring';
import type { LogoutMetadata } from './types/monitoring';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const loginTimestamp = useRef<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) {
      setUser(stored);
      loginTimestamp.current = Date.now();
    }
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
    loginTimestamp.current = Date.now();
  };

  const handleLogout = () => {
    const currentUser = user;
    const sessionDuration = loginTimestamp.current 
      ? Date.now() - loginTimestamp.current 
      : undefined;
    
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setUser(null);
    loginTimestamp.current = null;
    
    // Track logout event
    const logoutMetadata: LogoutMetadata = {
      logoutReason: 'user_initiated',
      sessionDuration,
    };
    userActionMonitor.track(UserAction.LOGOUT, currentUser || undefined, logoutMetadata);
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
