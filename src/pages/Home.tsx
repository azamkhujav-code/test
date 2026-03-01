import React, { useState } from 'react';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    
    // Simulate async logout operation with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    onLogout();
  };

  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={handleLogout} disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner"></span>
            <span>Signing out...</span>
          </>
        ) : (
          'Sign out'
        )}
      </button>
    </div>
  );
};

export default Home;
