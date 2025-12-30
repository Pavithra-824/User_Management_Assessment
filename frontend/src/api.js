import axios from 'axios';

const API = axios.create({
    baseURL: 'https://user-management-assessment.onrender.com/api/',
});

// Automatically add the JWT token to every request if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;