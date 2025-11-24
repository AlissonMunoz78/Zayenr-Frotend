import axios from 'axios';
import storeAuth from '../context/storeAuth';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-zayen.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = storeAuth.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      storeAuth.getState().clearToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;