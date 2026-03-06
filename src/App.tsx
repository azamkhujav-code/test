import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
import { AuthState, User, LoginProps, HomeProps } from './types/auth';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const validateSession = () => {
      const storedEmail = localStorage.getItem('userEmail');
      const storedLoginStatus = localStorage.getItem('loggedIn');

      if (storedEmail && storedLoginStatus === 'true') {
        setAuthState({
          user: { email: storedEmail },
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    };

    validateSession();
  }, []);

  const handleLogin: LoginProps['onLogin'] = (email: string) => {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loggedIn', 'true');
    setAuthState({
      user: { email },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  };

  const handleLogout: HomeProps['onLogout'] = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  if (authState.isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {!authState.isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home user={authState.user as User} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
