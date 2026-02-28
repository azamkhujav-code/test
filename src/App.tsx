import { useEffect, useState } from 'react';
// Task 3 completed: App wired login flow with Login/Home components
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
          fallback={<ErrorFallback componentName="Login Page" />}
          onError={(error) => console.error('Login page error:', error)}
        >
          <Login onLogin={handleLogin} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary 
          fallback={<ErrorFallback componentName="Home Page" />}
          onError={(error) => console.error('Home page error:', error)}
        >
          <Home user={user} onLogout={handleLogout} />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
