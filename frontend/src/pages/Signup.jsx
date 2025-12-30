import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup/`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err) {
      alert(JSON.stringify(err.response?.data || 'Signup failed'));
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input placeholder="Full Name" onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
