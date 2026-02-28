import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import type { UserState } from './types/user';
import { createUser, serializeUser, deserializeUser } from './types/user';
import './App.css';

function App() {
  const [user, setUser] = useState<UserState>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      const deserializedUser = deserializeUser(stored);
      if (deserializedUser) {
        setUser(deserializedUser);
      }
    }
  }, []);

  const handleLogin = (email: string) => {
    const newUser = createUser(email);
    setUser(newUser);
    localStorage.setItem('userData', serializeUser(newUser));
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userData');
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
