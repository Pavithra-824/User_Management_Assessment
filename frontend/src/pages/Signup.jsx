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
      const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
      const res = await axios.post(`${baseUrl}/api/signup/`, formData);
      
      // Store token and redirect directly to profile
      localStorage.setItem('token', res.data.token);
      alert("Registration Successful! Welcome.");
      navigate('/profile');
    } catch (err) {
      const errors = err.response?.data;
      // This displays the EXACT validation error from the backend
      const message = typeof errors === 'object' 
        ? Object.entries(errors).map(([k, v]) => `${k}: ${v}`).join('\n')
        : "Signup failed";
      alert(`Error:\n${message}`);
    }
  };

  return (
    <div style={styles.fullPageCenter}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <form onSubmit={handleSignup} style={styles.form}>
          <input type="text" placeholder="Full Name" style={styles.input} onChange={(e) => setFormData({...formData, full_name: e.target.value})} required />
          <input type="email" placeholder="Email" style={styles.input} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Password (Min 8 chars, 1 Upper, 1 Number)" style={styles.input} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <button type="submit" style={styles.primaryBtn}>Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;