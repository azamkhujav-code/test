import { useEffect, useState } from 'react';
import Login from './pages/Login';
// Task 3 completed: App wired login flow with Login/Home components
import Home from './pages/Home';
import type { User } from './types/user';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) {
      setUser({ email: stored });
    }
  }, []);

  const handleLogin = (email: string) => {
    const newUser: User = {
      email,
      loggedInAt: new Date(),
    };
    setUser(newUser);
  };

  const handleLogout = () => {
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
