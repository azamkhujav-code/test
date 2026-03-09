import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

function App() {
  // Authentication state: null when not logged in, string (email) when logged in
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on component mount
    const stored = localStorage.getItem('userEmail');
    if (stored) setUser(stored);
  }, []);

  // Authentication state machine:
  // 1. Initial state: user is null (not authenticated)
  // 2. Login: user is set to email string (authenticated)
  // 3. Logout: user is set back to null (not authenticated)

  const handleLogin = (email: string) => {
    // Transition to authenticated state
    setUser(email);
  };

  const handleLogout = () => {
    // Transition to not authenticated state
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  // Render the appropriate component based on the authentication state
  let content;
  if (!user) {
    // State: Not authenticated
    // Action: Show login form
    content = <Login onLogin={handleLogin} />;
  } else {
    // State: Authenticated
    // Action: Show home page with logout option
    content = <Home user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
