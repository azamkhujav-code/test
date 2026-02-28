import type { User } from '../types/user';

type Props = {
  user: User;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  const displayName = user.displayName || user.email;
  
  return (
    <div className="home">
      <h1>Welcome, {displayName}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
