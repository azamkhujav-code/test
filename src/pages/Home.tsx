import React from 'react';
import { getCSRFToken } from '../utils/csrfUtils';

type Props = {
  user?: string;
  onLogout: (csrfToken: string) => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  const handleLogout = () => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      onLogout(csrfToken);
    } else {
      console.error('CSRF token not found');
      // Handle missing CSRF token (e.g., show an error message)
    }
  };

  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};

export default Home;