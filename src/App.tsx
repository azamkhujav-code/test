import React, { useEffect, useState } from 'react';
import * as Ably from 'ably';
import Login from './pages/Login';
import Home from './pages/Home';
import { UserPresence } from './types/presence';
import './App.css';

function App() {
  const [user, setUser] = useState<UserPresence | null>(null);
  const [ably, setAbly] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userEmail');
    if (stored) {
      const userPresence: UserPresence = {
        clientId: stored,
        email: stored,
        cursorPosition: { x: 0, y: 0 }
      };
      setUser(userPresence);

      const ablyInstance = new Ably.Realtime({ key: process.env.REACT_APP_ABLY_API_KEY });
      setAbly(ablyInstance);
    }
  }, []);

  const handleLogin = (email: string) => {
    const userPresence: UserPresence = {
      clientId: email,
      email: email,
      cursorPosition: { x: 0, y: 0 }
    };
    setUser(userPresence);
    localStorage.setItem('userEmail', email);

    const ablyInstance = new Ably.Realtime({ key: process.env.REACT_APP_ABLY_API_KEY });
    setAbly(ablyInstance);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setUser(null);
    if (ably) {
      ably.close();
      setAbly(null);
    }
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home user={user} ably={ably} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
