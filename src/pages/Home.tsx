import React from 'react';
import { User } from '../types';

type Props = {
  user: User;
  onLogout: () => void;
  onShowProfile: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout, onShowProfile }) => {
  return (
    <div className="home">
      <h1>Welcome, {user.email}!</h1>
      <button onClick={onShowProfile} className="btn">View Profile</button>
      <button onClick={onLogout} className="btn">Sign out</button>
    </div>
  );
};

export default Home;