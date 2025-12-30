import React, { useState, useEffect } from 'react';
import API from '../api';
import { styles } from '../styles';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const fetchUsers = async (pageNum = 1) => {
    try {
      const res = await API.get(`admin/users/?page=${pageNum}`);
      // Since pagination is enabled in settings.py, data is an object
      setUsers(res.data.results);
      setHasNext(!!res.data.next);
      setPage(pageNum);
    } catch (err) { alert("Failed to load users"); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleStatus = async (id, currentStatus, name) => {
    if (!window.confirm(`Are you sure you want to change status for ${name}?`)) return;
    try {
      await API.post(`admin/users/${id}/toggle-status/`);
      fetchUsers(page); // Refresh current page
    } catch (err) { alert("Action failed"); }
  };

  return (
    <div style={styles.dashboardLayout}>
      <h1>Admin Dashboard</h1>
      <table style={styles.table}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.full_name}</td>
              <td>{u.email}</td>
              <td>{u.status}</td>
              <td>
                <button onClick={() => toggleStatus(u.id, u.status, u.full_name)}>
                  {u.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop: '20px', textAlign: 'center'}}>
        <button disabled={page === 1} onClick={() => fetchUsers(page - 1)}>Prev</button>
        <span style={{margin: '0 15px'}}>Page {page}</span>
        <button disabled={!hasNext} onClick={() => fetchUsers(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AdminDashboard;