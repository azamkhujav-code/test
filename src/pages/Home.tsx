import React, { useEffect, useRef, useState } from 'react';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Focus on main content when component mounts for screen reader users
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Allow screen readers to announce the state change
    setTimeout(() => {
      onLogout();
    }, 100);
  };

  return (
    <div className="home">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header role="banner">
        <nav role="navigation" aria-label="Main navigation">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-busy={isLoggingOut}
            aria-label={`Sign out${user ? ` from account ${user}` : ''}`}
            className="logout-button"
          >
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </nav>
      </header>
      <main 
        id="main-content"
        ref={mainRef}
        role="main" 
        aria-labelledby="welcome-heading"
        tabIndex={-1}
      >
        <h1 
          id="welcome-heading"
          ref={headingRef}
        >
          Welcome{user ? `, ${user}` : ''}!
        </h1>
        <section 
          aria-label="User dashboard"
          className="dashboard-content"
        >
          <p>You have successfully logged in to your account.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
