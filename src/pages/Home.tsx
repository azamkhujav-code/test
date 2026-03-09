import React, { useEffect, useState } from 'react';

type Props = {
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ onLogout }) => {
  const [userData, setUserData] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
        console.error('Error fetching user data:', err);
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