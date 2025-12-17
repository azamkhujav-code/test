import React from 'react';
import Header from '../components/Header';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="home">
      <Header user={user} onLogout={onLogout} />
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
