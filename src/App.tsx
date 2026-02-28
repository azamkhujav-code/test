import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
import type { User } from './types/user';
import { storage } from './utils/storage';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = storage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (userData: User) => {
    storage.saveUser(userData);
    setUser(userData);
  };

  const handleLogout = () => {
    storage.clearUser();
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
