import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '15px', background: '#2563eb', color: '#fff' }}>
      <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
        User Management
      </span>

      {user.role === 'admin' && (
        <Link to="/dashboard" style={{ color: '#fff', marginRight: '15px' }}>
          Dashboard
        </Link>
      )}

      <Link to="/profile" style={{ color: '#fff', marginRight: '15px' }}>
        Profile
      </Link>

      <button onClick={handleLogout} style={{ marginLeft: '20px' }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
