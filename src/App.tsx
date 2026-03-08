import React, { useEffect, useState } from 'react';
import Login from './pages/Login';\n// Task 3 completed: App wired login flow with Login/Home components
import Home from './pages/Home';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) setUser(stored);
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  // Render function to determine which component to display based on auth state
  const renderAuthComponent = () => {
    // Auth State: Not logged in
    if (!user) {
      return <Login onLogin={handleLogin} />;
    }
    // Auth State: Logged in
    else {
      return <Home user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="App">
      {renderAuthComponent()}
    </div>
  );
}

export default App;
