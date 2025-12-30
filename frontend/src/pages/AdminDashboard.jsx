import React, { useEffect, useState } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get('admin/users/');
    setUsers(res.data.results);
  };

  const toggleUser = async (id) => {
    await API.post(`admin/users/${id}/toggle/`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {users.map(u => (
        <div key={u.id}>
          {u.email} — {u.is_active ? 'Active' : 'Inactive'}
          <button onClick={() => toggleUser(u.id)}>Toggle</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
