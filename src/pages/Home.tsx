import React from 'react';
import { getWelcomeMessage } from '../utils/welcomeMessage';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="home">
      <h1>{getWelcomeMessage(user)}</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
