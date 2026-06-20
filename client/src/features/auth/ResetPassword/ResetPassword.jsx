import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormInput from '../../../components/FormInput/FormInput';
import FormButton from '../../../components/FormButton/FormButton';
import authService from '../../../services/authService';
import logo from '../../../../public/Nest.png';

function ResetPassword() {
  const { t, i18n } = useTranslation(['auth']);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError('Token is missing');
    
    setLoading(true);
    setError(null);
    try {
      await authService.resetPassword({ token, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10">
        <div className="bg-red-50 text-red-700 p-8 rounded-3xl border border-red-200 text-center">
          رابط غير صالح أو منتهي الصلاحية.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf3ee] flex items-center justify-center px-4 py-10" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-emerald-600 shadow-xl flex items-center justify-center">
            <img src={logo} alt="logo" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 mt-6">تعيين كلمة سر جديدة</h1>
        </div>

        <div className="bg-white rounded-4xl shadow-2xl p-8 border border-emerald-100">
          {success ? (
            <div className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl text-center font-bold">
              تم تغيير كلمة السر بنجاح! جاري تحويلك...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-bold border border-red-200">{error}</div>}
              
              <FormInput 
                label="كلمة السر الجديدة" 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <FormButton 
                text={loading ? "جاري الحفظ..." : "حفظ كلمة السر"} 
                type="submit"
                disabled={loading}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
