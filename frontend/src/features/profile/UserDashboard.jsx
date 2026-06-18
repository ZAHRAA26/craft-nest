import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';

const UserDashboard = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation(['common']);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="bg-white p-8 rounded-4xl shadow-xl border border-emerald-100 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl font-black">
              {user?.name?.charAt(0)}
            </div>
            <div className="text-center md:text-right flex-1">
              <h1 className="text-3xl font-black text-emerald-900">{t('welcome')}, {user?.name}</h1>
              <p className="text-emerald-600 font-medium">{t('user_dashboard_subtitle') || 'مرحباً بك في مساحتك الخاصة'}</p>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: My Profile */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform">
            <h3 className="text-xl font-bold text-emerald-900 mb-4 border-b pb-2">الملف الشخصي</h3>
            <div className="space-y-3 text-sm">
              <p><span className="text-gray-500">الاسم:</span> <span className="font-bold">{user?.name}</span></p>
              <p><span className="text-gray-500">البريد:</span> <span className="font-bold">{user?.email}</span></p>
              <p><span className="text-gray-500">الحالة:</span> <span className="text-emerald-600 font-bold">نشط</span></p>
            </div>
          </div>

          {/* Card 2: Recent Activity */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 md:col-span-2">
            <h3 className="text-xl font-bold text-emerald-900 mb-4 border-b pb-2">آخر النشاطات</h3>
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 italic">
              <p>لا توجد نشاطات مؤخراً</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
