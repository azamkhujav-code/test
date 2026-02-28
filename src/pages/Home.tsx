import type { User } from '../types/user';

type Props = {
  user: User;
  onLogout: () => void;
};

const Home = ({ user, onLogout }: Props) => {
  return (
    <div className="home">
      <h1>Welcome{user.displayName || user.email}!</h1>
      {user.lastLogin && (
        <p>Last login: {user.lastLogin.toLocaleString()}</p>
      )}
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
