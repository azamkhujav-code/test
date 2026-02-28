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
          onError={(error, errorInfo) => errorLogger.logError(error, errorInfo)}
          fallback={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>Unable to load login page</h2>
              <p>Please refresh the page to try again.</p>
              <button onClick={() => window.location.reload()}>Refresh</button>
            </div>
          }
        >
          <Login onLogin={handleLogin} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary 
          onError={(error, errorInfo) => errorLogger.logError(error, errorInfo)}
          fallback={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>Unable to load home page</h2>
              <p>Please refresh the page or log out to try again.</p>
              <button onClick={handleLogout} style={{ marginRight: '10px' }}>Log Out</button>
              <button onClick={() => window.location.reload()}>Refresh</button>
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
