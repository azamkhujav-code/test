import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(
    () => localStorage.getItem('userEmail')
  );

  const handleLogin = (email: string) => {
    setUser(email);
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
