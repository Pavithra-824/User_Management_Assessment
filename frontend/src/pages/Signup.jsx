import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styles } from '../styles'; 

const Signup = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Updated endpoint to match backend: /api/signup/
      await axios.post(`${import.meta.env.VITE_API_URL}/api/signup/`, formData);
      alert("Registration Successful! Redirecting to Login...");
      navigate('/login');
    } catch (err) {
      const errorMsg = err.response?.data?.email || err.response?.data?.detail || "Signup failed.";
      alert(`Error: ${errorMsg}`);
    }
  };

  return (
    <div style={styles.fullPageCenter}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join our platform to manage your profile</p>
        </div>
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" 
              style={styles.input} 
              value={formData.full_name} 
              onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              style={styles.input} 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              style={styles.input} 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" style={styles.primaryBtn}>Sign Up</button>
        </form>
        <p style={styles.footerText}>Already have an account? <Link to="/login" style={styles.link}>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;