import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="home">
      <h1>Welcome{user?.email ? `, ${user.email}` : ''}!</h1>
      <button onClick={logout}>Sign out</button>
    </div>
  );
};

export default Home;
