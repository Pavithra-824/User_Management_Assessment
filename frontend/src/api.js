import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/auth/',
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