import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styles } from '../styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login/`, { email, password });
    
    // 1. Save the token
    localStorage.setItem('token', res.data.token);
    
    // 2. Get the role from the backend response
    const userRole = res.data.user.role; 

    alert("Login Successful!");

    // 3. Dynamic Navigation
    if (userRole === 'admin') {
      navigate('/dashboard'); // Admins go to the Control Panel
    } else {
      navigate('/profile');   // Normal users go to their Profile
    }
  } catch (err) {
    alert("Login Failed. Check your email and password.");
  }
};
  return (
    <div style={styles.fullPageCenter}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account to continue</p>
        </div>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" style={styles.primaryBtn}>Sign In</button>
        </form>
        <p style={styles.footerText}>Don't have an account? <Link to="/signup" style={styles.link}>Create one</Link></p>
      </div>
    </div>
  );
};

export default Login;