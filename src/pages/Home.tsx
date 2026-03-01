type Props = {
  user?: string;
  onLogout: () => void;
};

const Home = ({ user, onLogout }: Props) => {
  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
