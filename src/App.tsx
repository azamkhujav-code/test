import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallback from './components/ErrorFallback';
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
          componentName="Login"
          fallback={(error, resetError) => (
            <ErrorFallback 
              error={error} 
              resetError={resetError} 
              componentName="Login"
            />
          )}
          resetKeys={[user]}
        >
          <Login onLogin={handleLogin} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary
          componentName="Home"
          fallback={(error, resetError) => (
            <ErrorFallback 
              error={error} 
              resetError={resetError} 
              componentName="Home"
            />
          )}
          resetKeys={[user]}
        >
          <Home user={user} onLogout={handleLogout} />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
