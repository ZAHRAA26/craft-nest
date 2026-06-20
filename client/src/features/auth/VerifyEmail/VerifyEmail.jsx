import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import GlobalLoader from '../../../components/common/GlobalLoader';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        return;
      }
      try {
        await authService.verifyEmail(token);
        setStatus('success');
        setTimeout(() => navigate('/login'), 4000);
      } catch (err) {
        setStatus('error');
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf3ee] p-6">
      {status === 'loading' && <GlobalLoader message="جاري التحقق من بريدك الإلكتروني..." />}
      
      {status === 'success' && (
        <div className="bg-white p-10 rounded-4xl shadow-2xl text-center max-w-md border border-emerald-100 animate-fade-in-up">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
          <h1 className="text-2xl font-black text-emerald-900 mb-4">تم تفعيل الحساب!</h1>
          <p className="text-emerald-700">شكراً لك، تم التحقق من بريدك الإلكتروني بنجاح. سيتم تحويلك لصفحة الدخول الآن.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-white p-10 rounded-4xl shadow-2xl text-center max-w-md border border-red-100 animate-shake">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✕</div>
          <h1 className="text-2xl font-black text-red-900 mb-4">فشل التحقق</h1>
          <p className="text-red-700">الرابط منتهي الصلاحية أو غير صالح. يرجى طلب رابط جديد.</p>
          <button onClick={() => navigate('/login')} className="mt-6 text-emerald-600 font-bold underline">العودة للدخول</button>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
