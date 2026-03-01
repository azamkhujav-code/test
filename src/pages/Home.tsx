import { useAuth } from '../hooks/useAuth';

type Props = {
  user?: string;
};

const Home: React.FC<Props> = ({ user }) => {
  const { logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Auth context will clear user state and App will re-render
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="home">
      <h1>Welcome{user ? `, ${user}` : ''}!</h1>
      <div className="security-info">
        <p>Your session is secured with:</p>
        <ul>
          <li>HttpOnly cookies (protected from XSS attacks)</li>
          <li>CSRF token protection</li>
          <li>Secure session management</li>
        </ul>
      </div>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? 'Signing out...' : 'Sign out'}
      </button>
    </div>
  );
};

export default Home;
