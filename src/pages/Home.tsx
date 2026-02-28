// Task 2 completed: Home component scaffold added
import type { User } from '../types/user';

type Props = {
  user: User;
  onLogout: () => void;
};

const Home = ({ user, onLogout }: Props) => {
  return (
    <div className="home">
      <h1>Welcome, {user.email}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
