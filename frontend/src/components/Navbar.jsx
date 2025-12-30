import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-bold text-blue-600">UserPortal</Link>
                {user?.role === 'admin' && (
                    <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                )}
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-medium">Profile</Link>
            </div>
            
            <div className="flex items-center space-x-6">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800">{user?.full_name}</p>
                    <p className="text-xs text-gray-500 uppercase flex items-center justify-end">
                        {user?.role === 'admin' ? <ShieldCheck className="w-3 h-3 mr-1 text-red-500" /> : <User className="w-3 h-3 mr-1" />}
                        {user?.role}
                    </p>
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;