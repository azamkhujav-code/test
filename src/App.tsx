import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';
import { AppState, User } from './types';

function App() {
  const [state, setState] = useState<AppState>({
    user: { email: '', loggedIn: false },
    showProfile: false
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedEmail && storedLoggedIn) {
      setState(prevState => ({
        ...prevState,
        user: { email: storedEmail, loggedIn: true }
      }));
    }
  }, []);

  const handleLogin = (email: string) => {
    setState(prevState => ({
      ...prevState,
      user: { email, loggedIn: true }
    }));
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setState({
      user: { email: '', loggedIn: false },
      showProfile: false
    });
  };

  const toggleProfile = () => {
    setState(prevState => ({
      ...prevState,
      showProfile: !prevState.showProfile
    }));
  };

  return (
    <div className="App">
      {!state.user.loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : state.showProfile ? (
        <Profile user={state.user} onBack={toggleProfile} />
      ) : (
        <Home user={state.user} onLogout={handleLogout} onShowProfile={toggleProfile} />
      )}
    </div>
  );
}

export default App;
