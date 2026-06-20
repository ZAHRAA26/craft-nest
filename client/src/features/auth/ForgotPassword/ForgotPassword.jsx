import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FormInput from '../../../components/FormInput/FormInput';
import FormButton from '../../../components/FormButton/FormButton';
import authService from '../../../services/authService';
import logo from '../../../../public/Nest.png';

function ForgotPassword() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await authService.forgotPassword(email);
      setMessage(i18n.language === 'ar' ? 'تم إرسال رابط استعادة كلمة المرور لبريدك الإلكتروني' : 'Password reset link sent to your email');
    } catch (err) {
      setError(err || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf3ee] flex items-center justify-center px-4 py-10" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-700 to-emerald-500 shadow-xl flex items-center justify-center">
              <img src={logo} alt="logo" className="w-14 h-14 object-contain" />
            </div>
          </Link>
          <h1 className="text-3xl font-black text-emerald-900 mt-6">{t('auth:forgot_password')}</h1>
        </div>

        <div className="bg-white rounded-4xl shadow-2xl p-8 border border-emerald-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm font-bold border border-emerald-200">{message}</div>}
            {error && <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-bold border border-red-200">{error}</div>}
            
            <FormInput 
              label={t('auth:email')} 
              placeholder={t('auth:email_placeholder')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormButton 
              text={loading ? t('auth:submitting') : (i18n.language === 'ar' ? 'إرسال الرابط' : 'Send Link')} 
              type="submit"
              disabled={loading}
            />

            <p className="text-center font-bold">
              <Link to="/login" className="text-emerald-600 hover:text-emerald-500">{i18n.language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
