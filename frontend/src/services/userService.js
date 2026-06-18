import api from './api';

/**
 * User Service - التعامل مع بيانات المستخدم الشخصية
 */
const userService = {
  // جلب بيانات المستخدم (يستخدمها fetchMe)
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // تحديث البيانات الشخصية (لو أضفتها لاحقاً في الباك)
  updateProfile: async (data) => {
    const response = await api.patch('/auth/profile', data);
    return response.data;
  },

  // التحقق من الإيميل
  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response.data;
  },

  // الاشتراك في النشرة الإخبارية (عام)
  subscribeNewsletter: async (email) => {
    const response = await api.post('/public/newsletter-subscribe', { email });
    return response.data;
  }
};

export default userService;
