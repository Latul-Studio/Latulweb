import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/slices/authSlice';

// Create Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // Default to local Django backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Inject Token
api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Unauthorized: Clear session and redirect needed?
            // Usually, we dispatch logout.
            store.dispatch(logout());
            // Optional: window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;
