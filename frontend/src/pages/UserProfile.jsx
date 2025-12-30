import React, { useState, useEffect } from 'react';
import API from '../api';
import { styles } from '../styles';

const UserProfile = () => {
  const [profile, setProfile] = useState({ full_name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('profile/');
        setProfile(res.data);
      } catch {
        setMessage('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('profile/update/', {
        full_name: profile.full_name,
      });
      setMessage('Profile updated successfully!');
    } catch {
      setMessage('Profile update failed');
    }
  };

  return (
    <div style={styles.fullPageCenter}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Profile</h1>
          <p style={styles.subtitle}>View or update your details</p>
        </div>

        {message && <p style={{ textAlign: 'center' }}>{message}</p>}

        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} value={profile.email} readOnly />
          </div>

          <button type="submit" style={styles.primaryBtn}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
