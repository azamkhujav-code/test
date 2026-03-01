import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { logUserAction } from './utils/logger';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) {
      setUser(stored);
      // Log session restoration
      logUserAction('Session restored', 'info', {
        email: stored,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = () => {
    // Log logout action with sanitized user info
    logUserAction('User logged out', 'info', {
      email: user || 'unknown',
      timestamp: new Date().toISOString(),
    });
    
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
