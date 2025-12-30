import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/" element={<Login />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
}

export default App;