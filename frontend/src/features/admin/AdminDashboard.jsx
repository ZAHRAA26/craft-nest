import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, revokeUserRefresh } from '../../store/slices/adminSlice';
import AdminLayout from './AdminLayout';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, totalUsers, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers({ limit: 5 }));
  }, [dispatch]);

  const handleRevokeAll = (id) => {
    if (window.confirm('إنهاء جميع جلسات هذا المستخدم؟')) {
      dispatch(revokeUserRefresh(id));
    }
  };

  const stats = [
    { label: 'إجمالي المستخدمين', value: totalUsers, icon: '👥', color: 'bg-blue-500' },
    { label: 'طلبات الانضمام', value: users.filter(u => u.role === 'CRAFTSMAN').length, icon: '🛠️', color: 'bg-emerald-500' },
    { label: 'الحسابات المحظورة', value: users.filter(u => u.isBlocked).length, icon: '🚫', color: 'bg-red-500' },
    { label: 'جلسات نشطة', value: 'بانتظار البيانات', icon: '🔑', color: 'bg-amber-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-10 animate-fade-in">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-5xl font-black text-emerald-950 tracking-tighter">مركز القيادة</h1>
            <p className="text-emerald-700 font-bold mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              النظام يعمل بكفاءة عالية
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/users" className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all text-sm">
              إدارة الأعضاء
            </Link>
            <Link to="/admin/newsletter" className="bg-white text-emerald-900 border border-emerald-100 px-6 py-3 rounded-2xl font-black shadow-sm hover:bg-emerald-50 transition-all text-sm">
              إرسال نشرة
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-white flex flex-col gap-4 group hover:border-emerald-200 transition-all">
              <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-black text-slate-800">{stat.value}</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Users Table */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-50">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-emerald-900">أحدث الأعضاء</h3>
              <Link to="/admin/users" className="text-sm font-black text-emerald-600 hover:underline">عرض الكل</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-white text-gray-400 font-black text-xs uppercase">
                  <tr>
                    <th className="px-8 py-4">المستخدم</th>
                    <th className="px-8 py-4">الرتبة</th>
                    <th className="px-8 py-4 text-center">جلسات الأمان</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.slice(0, 5).map((user) => (
                    <tr key={user._id} className="hover:bg-emerald-50/10 transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-400 font-medium">{user.email}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black">{user.role}</span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <button 
                          onClick={() => handleRevokeAll(user._id)}
                          className="text-[10px] font-black text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100"
                        >
                          إنهاء الجلسات
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Health */}
          <div className="space-y-8">
            <div className="bg-emerald-900 rounded-[2.5rem] p-8 shadow-2xl text-white">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                حالة الخوادم
              </h3>
              <div className="space-y-6">
                {[
                  { label: 'قاعدة البيانات (MongoDB)', status: 'متصل', color: 'text-emerald-400' },
                  { label: 'خادم الإيميل (NodeMailer)', status: 'جاهز', color: 'text-emerald-400' },
                  { label: 'نظام التخزين (Cloud)', status: 'نشط', color: 'text-emerald-400' },
                  { label: 'زمن الاستجابة', status: '45ms', color: 'text-blue-400' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <span className="opacity-60 font-bold">{s.label}</span>
                    <span className={`font-black ${s.color}`}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <h3 className="text-lg font-black text-emerald-950 mb-4">النشرة البريدية</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">أرسل تحديثات النظام أو العروض لجميع المستخدمين دفعة واحدة.</p>
              <Link to="/admin/newsletter" className="block w-full py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-center hover:bg-emerald-100 transition-colors">
                فتح المحرر
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
