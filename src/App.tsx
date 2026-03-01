import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {!isAuthenticated ? <Login /> : <Home />}
    </div>
  );
}

export default App;
