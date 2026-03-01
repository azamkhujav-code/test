import React from 'react';
import ErrorTest from '../components/ErrorTest';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
      <ErrorTest />
    </div>
  );
};

export default Home;
