import React from 'react';
// Task 2 completed: Home component scaffold added

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
