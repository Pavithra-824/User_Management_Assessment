import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styles } from '../styles';
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
const fetchUsers = async () => {
  const token = localStorage.getItem('token');
  // Add 'admin/' to the path to match your backend urls.py
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users/`, {
  headers: { Authorization: `Bearer ${token}` }
});
  setUsers(res.data);
};
    fetchUsers();
  }, []);

  return (
    <div style={styles.dashboardLayout}>
      <div style={styles.contentWrapper}>
        <header style={styles.dashboardHeader}>
          <h1 style={styles.pageTitle}>Admin Control Panel</h1>
          <button onClick={() => { localStorage.clear(); window.location.href='/login'; }} style={styles.logoutBtn}>Logout</button>
        </header>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Users</p>
            <h2 style={styles.statValue}>{users.length}</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Database Status</p>
            <h2 style={{...styles.statValue, color: '#10b981'}}>Connected</h2>
          </div>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={styles.tr}>
                  <td style={styles.td}>{u.full_name}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>
                    <span style={u.is_staff ? styles.adminBadge : styles.userBadge}>
                      {u.is_staff ? 'Admin' : 'User'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;