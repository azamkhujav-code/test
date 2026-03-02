import type { FC } from 'react';
import './Home.css';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
