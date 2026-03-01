import React, { useEffect, useRef } from 'react';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Announce page change to screen readers by focusing the heading
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enhanced keyboard navigation: Allow Enter and Space to trigger logout
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLogout();
    }
  };

  return (
    <main className="home" role="main" aria-labelledby="welcome-heading">
      <h1 
        id="welcome-heading"
        ref={headingRef}
        tabIndex={-1}
        aria-live="polite"
      >
        Welcome{user ? `, ${user}` : ''}!
      </h1>
      <nav aria-label="User actions">
        <button 
          onClick={handleLogout}
          onKeyDown={handleKeyDown}
          aria-label={`Sign out${user ? ` from ${user}'s account` : ''}`}
          type="button"
        >
          Sign out
        </button>
      </nav>
    </main>
  );
};

export default Home;
