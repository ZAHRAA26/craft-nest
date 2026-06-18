// src/services/api.js
import axios from 'axios';

export const BASE_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // لو الخطأ 401 والريكوست مبعتتش قبل كدا للريفرش
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // محاولة تجديد التوكن
          const response = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
          const { accessToken } = response.data;

          localStorage.setItem('accessToken', accessToken);
          
          // إعادة المحاولة بالتوكن الجديد
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // لو فشل تجديد التوكن، سجل خروج
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    // تنسيق رسالة الخطأ لتكون واضحة للفرونت
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(message);
  }
);

export default api;
