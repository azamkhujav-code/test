import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null; // or redirect to login
  }

  return (
    <div className="home">
      <h1>Welcome, {user.email}!</h1>
      <div className="user-profile">
        <h2>User Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more user profile information here */}
      </div>
      <div className="protected-content">
        <h2>Protected Content</h2>
        <p>This is some protected content that only authenticated users can see.</p>
        {/* Add more protected content here */}
      </div>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};

export default Home;