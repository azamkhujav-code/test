import React, { useState } from 'react';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Simulate async logout operation (e.g., API call to invalidate session)
      await new Promise((resolve) => setTimeout(resolve, 800));
      onLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? (
          <span className="button-content">
            <span className="spinner"></span>
            Signing out...
          </span>
        ) : (
          'Sign out'
        )}
      </button>
    </div>
  );
};

export default Home;
