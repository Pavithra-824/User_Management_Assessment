import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  } 
/>
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;