import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  onLogout: () => void;
};

type UserData = {
  email: string;
  // Add other user properties as needed
};

const Home: React.FC<Props> = ({ onLogout }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/check-auth');
        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <h1>Welcome, {userData?.email}!</h1>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;