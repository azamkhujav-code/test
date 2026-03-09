import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch('/api/validate-session', {
          method: 'POST',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.valid) {
          setUser(data.userEmail);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Session validation error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
