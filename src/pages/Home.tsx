import React from 'react'; // t2: header integration completed
import Header from '../components/Header';
import Footer from '../components/Footer';

type Props = {
  user?: string;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="home">
      <Header />
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
      <Footer />
    </div>
  );
};

export default Home;
