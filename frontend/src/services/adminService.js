import api from './api';

/**
 * Admin Service - إدارة المستخدمين والنظام
 */
const adminService = {
  getUsers: async (params) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await api.patch(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  toggleUserBlock: async (id) => {
    const response = await api.patch(`/admin/users/${id}/block`);
    return response.data;
  },

  revokeRefresh: async (id) => {
    const response = await api.post(`/admin/users/${id}/revoke-refresh`);
    return response.data;
  },

  sendNewsletter: async (data) => {
    const response = await api.post('/admin/newsletter', data);
    return response.data;
  }
};

export default adminService;
