import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ onLogout }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user', { withCredentials: true });
        setUser(response.data.email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;