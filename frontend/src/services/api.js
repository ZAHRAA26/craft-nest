// src/services/api.js
<<<<<<< HEAD
import axios from 'axios'
import store from '../store/store'  // عشان نقدر نوصل للستور من هنا
import { logout } from '../store/slices/authSlice'
// instance = نسخة من axios بإعدادات ثابتة
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — بيشتغل قبل ما أي ريكوست تتبعت
// بيضيف الـ token تلقائي في الهيدر
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken  // جيب الـ token من الستور
    if (token) {
      config.headers.Authorization = `Bearer ${token}`  // حطه في الهيدر
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — بيشتغل لما الرد يرجع
// لو الـ token انتهى (401) يعمل logout تلقائي
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())  // كلير الستور والـ localStorage
    }
    return Promise.reject(error)
  }
)

export default api
=======
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
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
