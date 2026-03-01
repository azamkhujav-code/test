import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {!user ? <Login /> : <Home user={user.email} />}
    </div>
  );
}

export default App;
