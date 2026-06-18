import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';

const CraftsmanDashboard = () => {
  const user = useSelector(selectUser);
  const { t, i18n } = useTranslation(['common']);
  const lang = i18n.language;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f8fafc] to-[#edf3ee] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-emerald-100 relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 bg-linear-to-br from-emerald-600 to-emerald-400 rounded-4xl flex items-center justify-center text-6xl font-black text-white shadow-2xl shadow-emerald-200">
              {user?.name?.charAt(0)}
            </div>
            
            <div className="flex-1 text-center md:text-right">
              <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase mb-4 tracking-widest">
                حرفي محترف
              </div>
              <h1 className="text-5xl font-black text-emerald-950 mb-4">{user?.name}</h1>
              <p className="text-lg text-emerald-700 font-medium max-w-2xl leading-relaxed">
                {user?.bio?.[lang] || 'فنان ومبدع يشاركنا شغفه في الصناعة اليدوية'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'المنتجات', value: '12', icon: '📦' },
            { label: 'المبيعات', value: '150', icon: '💰' },
            { label: 'التقييم', value: '4.9', icon: '⭐️' },
            { label: 'المتابعين', value: '1.2k', icon: '👥' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-lg hover:shadow-xl transition-all cursor-default">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-emerald-900">{stat.value}</div>
              <div className="text-sm font-bold text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Center */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-900 text-white p-8 rounded-4xl shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-2">إضافة منتج جديد</h3>
              <p className="opacity-70">ابدأ في عرض إبداعاتك الجديدة للعالم الآن.</p>
            </div>
            <button className="mt-8 bg-emerald-500 hover:bg-emerald-400 py-4 rounded-2xl font-black transition-colors cursor-pointer">
              إضافة إلى المتجر
            </button>
          </div>

          <div className="bg-white p-8 rounded-4xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-black text-emerald-900 mb-6">التخصصات</h3>
            <div className="flex flex-wrap gap-3">
              {user?.craftSpecialty?.map((craft, i) => (
                <span key={i} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-bold text-sm">
                  {craft}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftsmanDashboard;
