import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleUserBlock, updateUserRole, revokeUserRefresh } from '../../store/slices/adminSlice';
import AdminLayout from './AdminLayout';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlock = (id) => {
    if (window.confirm('هل أنت متأكد من تغيير حالة الحظر؟')) {
      dispatch(toggleUserBlock(id));
    }
  };

  const handleRoleChange = (id, newRole) => {
    dispatch(updateUserRole({ id, role: newRole }));
  };

  const handleRevokeSessions = (id) => {
    if (window.confirm('هل أنت متأكد من إنهاء جميع جلسات هذا المستخدم؟ سيتم تسجيل خروجه من جميع الأجهزة.')) {
      dispatch(revokeUserRefresh(id));
    }
  };

  if (loading && users.length === 0) return <AdminLayout><div className="animate-pulse text-emerald-600 font-bold">جاري تحميل بيانات الأعضاء...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="bg-white rounded-4xl shadow-2xl overflow-hidden border border-emerald-50">
        <div className="p-8 bg-linear-to-r from-[#143d2d] to-[#2d8b57] text-white flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black">إدارة الأعضاء</h2>
            <p className="text-emerald-100 opacity-80 mt-1">التحكم الكامل في حسابات المنصة وصلاحياتهم</p>
          </div>
          <div className="bg-white/20 px-6 py-2 rounded-2xl backdrop-blur-md font-bold">
            إجمالي الأعضاء: {users.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-emerald-50/50 text-emerald-900 font-black uppercase text-sm border-b border-emerald-100">
              <tr>
                <th className="px-8 py-5">المستخدم</th>
                <th className="px-8 py-5">الرتبة</th>
                <th className="px-8 py-5">الحالة</th>
                <th className="px-8 py-5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-emerald-50/20 transition-all group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{user.name}</div>
                    <div className="text-xs text-gray-400 font-medium">{user.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-gray-100 border border-transparent rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                    >
                      <option value="USER">مستخدم</option>
                      <option value="CRAFTSMAN">حرفي</option>
                      <option value="ADMIN">مدير</option>
                    </select>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide ${user.isBlocked ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {user.isBlocked ? 'محظور' : 'نشط'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => handleRevokeSessions(user._id)}
                        className="px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-xs font-black hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                        title="إنهاء الجلسات"
                      >
                        إنهاء الجلسات
                      </button>
                      <button 
                        onClick={() => handleBlock(user._id)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all shadow-sm ${user.isBlocked ? 'bg-emerald-600 text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
                      >
                        {user.isBlocked ? 'إلغاء الحظر' : 'حظر الحساب'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
