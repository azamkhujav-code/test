import React, { useState } from 'react';
import { HomeProps } from '../types/auth';

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    onLogout();
    setShowLogoutConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <div className="home">
      <h1>Welcome, {user.email}!</h1>
      <button onClick={handleLogoutClick}>Sign out</button>

      {showLogoutConfirmation && (
        <div className="logout-confirmation" role="dialog" aria-labelledby="logout-title">
          <h2 id="logout-title">Confirm Logout</h2>
          <p>Are you sure you want to log out?</p>
          <div className="logout-actions">
            <button onClick={handleConfirmLogout}>Yes, log out</button>
            <button onClick={handleCancelLogout}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;