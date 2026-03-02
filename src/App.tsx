import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { secureGetItem, secureRemoveItem } from './utils/secureStorage';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Use secure storage to retrieve user email
    const stored = secureGetItem('userEmail');
    if (stored) setUser(stored);
  }, []);

  const handleLogin = (email: string) => {
    setUser(email);
  };

  const handleLogout = () => {
    // Use secure storage to remove user data
    secureRemoveItem('loggedIn');
    secureRemoveItem('userEmail');
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
