import { useState } from 'react';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home = ({ user, onLogout }: Props) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Brief delay to allow screen reader to announce logout action
    setTimeout(() => {
      onLogout();
    }, 100);
  };

  return (
    <div className="home">
      <header role="banner">
        <nav role="navigation" aria-label="Main navigation">
          <button 
            onClick={handleLogout}
            aria-label={`Sign out ${user || 'user'}`}
            disabled={isLoggingOut}
            className="logout-button"
          >
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </nav>
      </header>
      
      <main role="main" id="main-content">
        <h1 tabIndex={-1}>
          Welcome{user ? `, ${user}` : ''}!
        </h1>
        
        <section aria-labelledby="dashboard-heading">
          <h2 id="dashboard-heading" className="visually-hidden">Dashboard</h2>
          <p>You are now logged in and can access your personalized content.</p>
        </section>
        
        {isLoggingOut && (
          <div 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
            className="logout-status"
          >
            Logging out, please wait...
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
