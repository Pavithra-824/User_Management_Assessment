import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styles } from '../styles';
const UserProfile = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/update/`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div style={styles.fullPageCenter}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Profile</h1>
          <p style={styles.subtitle}>View or update your account information</p>
        </div>
        
        {message && <p style={{textAlign: 'center', color: '#10b981', fontWeight: '600'}}>{message}</p>}

        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" 
              style={styles.input} 
              value={profile.full_name} 
              onChange={(e) => setProfile({...profile, full_name: e.target.value})} 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address (Read-only)</label>
            <input 
              type="email" 
              style={{...styles.input, backgroundColor: '#f1f5f9', cursor: 'not-allowed'}} 
              value={profile.email} 
              readOnly 
            />
          </div>
          <button type="submit" style={styles.primaryBtn}>Update Profile</button>
        </form>
        <button 
          onClick={() => window.location.href = '/dashboard'} 
          style={{...styles.link, width: '100%', border: 'none', background: 'none', marginTop: '15px', cursor: 'pointer'}}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UserProfile;