import React from 'react';

const AdminDashboard = () => {
  // Mock data for styling - replace with your actual API data
  const users = [
    { id: 1, full_name: 'Pavithra Kannan', email: 'pavithra@example.com', role: 'Admin' },
    { id: 2, full_name: 'Test User', email: 'test@example.com', role: 'User' },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar Placeholder or Header */}
      <header style={styles.header}>
        <h1 style={styles.pageTitle}>User Management Dashboard</h1>
        <button style={styles.logoutBtn}>Logout</button>
      </header>

      {/* Metric Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Users</p>
          <h3 style={styles.statValue}>{users.length}</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Active Sessions</p>
          <h3 style={styles.statValue}>12</h3>
        </div>
      </div>

      {/* User Table Card */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <h2 style={styles.tableTitle}>All Registered Users</h2>
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Email Address</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={styles.tableRow}>
                <td style={styles.td}>{user.full_name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  <span style={user.role === 'Admin' ? styles.adminBadge : styles.userBadge}>
                    {user.role}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.editBtn}>Edit</button>
                  <button style={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Modern Dashboard Styles
const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f1f5f9', // Light slate background
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  pageTitle: { fontSize: '24px', fontWeight: '700', color: '#0f172a' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
  statCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  statLabel: { color: '#64748b', fontSize: '14px', margin: '0 0 5px 0' },
  statValue: { fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: 0 },

  tableCard: { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' },
  tableHeader: { padding: '20px', borderBottom: '1px solid #e2e8f0' },
  tableTitle: { fontSize: '18px', fontWeight: '600', color: '#334155', margin: 0 },
  
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  tableHeadRow: { backgroundColor: '#f8fafc' },
  th: { padding: '15px 20px', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' },
  td: { padding: '15px 20px', fontSize: '14px', color: '#334155', borderBottom: '1px solid #f1f5f9' },
  tableRow: { transition: 'background-color 0.2s' },

  adminBadge: { padding: '4px 10px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  userBadge: { padding: '4px 10px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },

  editBtn: { marginRight: '10px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' },
  deleteBtn: { color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' },
};

export default AdminDashboard;
