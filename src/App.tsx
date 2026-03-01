import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import { errorLogger } from './utils/errorLogger';
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

  return (
    <div className="App">
      {!user ? (
        <ErrorBoundary
          key="login"
          onError={(error, errorInfo) => errorLogger.log(error, errorInfo)}
          fallback={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>Login Error</h2>
              <p>There was an error loading the login page.</p>
              <button onClick={() => window.location.reload()}>Reload Page</button>
            </div>
          }
        >
          <Login onLogin={handleLogin} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary
          key="home"
          resetKeys={[user]}
          onError={(error, errorInfo) => errorLogger.log(error, errorInfo)}
          fallback={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>Home Page Error</h2>
              <p>There was an error loading the home page.</p>
              <button onClick={handleLogout}>Return to Login</button>
            </div>
          }
        >
          <Home user={user} onLogout={handleLogout} />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
