import React from 'react';
import { HomeProps } from '../types';

/**
 * Home component displayed after successful login.
 * @param {HomeProps} props - The props for the Home component
 * @returns {JSX.Element} The rendered Home component
 */
const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;