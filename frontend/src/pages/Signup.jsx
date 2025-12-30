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
    // 1. Log the data being sent to verify it's not empty
    console.log("Sending Form Data:", formData);

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/register/`, formData);
    
    alert("Registration Successful!");
    navigate('/login');
  } catch (err) {
    // 2. Capture the actual error message from the backend
    const errorMsg = err.response?.data?.email || err.response?.data?.detail || "Signup failed. Please try again.";
    console.error("Server Error:", err.response?.data);
    
    // 3. Show the real error instead of the hardcoded "Email exists" message
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
            <input type="text" style={styles.input} value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} required placeholder="John Doe" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" style={styles.input} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="name@company.com" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" style={styles.input} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required placeholder="••••••••" />
          </div>
          <button type="submit" style={styles.primaryBtn}>Sign Up</button>
        </form>
        <p style={styles.footerText}>Already have an account? <Link to="/login" style={styles.link}>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;