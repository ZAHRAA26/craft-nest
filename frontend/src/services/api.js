// src/services/api.js
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