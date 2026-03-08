import React from 'react';

// Utility function to generate welcome message
// This function encapsulates the logic for creating a personalized welcome message
// It takes an optional user parameter and returns a string
const getWelcomeMessage = (user?: string): string => {
  return `Welcome${user ? `, ${user}` : ''}!`;
};

// Props interface for the Home component
type Props = {
  user?: string;
  onLogout: () => void;
};

// Home component
// This component displays a welcome message and a sign out button
// It uses the getWelcomeMessage utility function to generate the welcome message
const Home: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="home">
      <h1>{getWelcomeMessage(user)}</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;