import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import FormInput from '../../components/FormInput/FormInput';
import FormButton from '../../components/FormButton/FormButton';
import adminService from '../../services/adminService';

function NewsletterAdmin() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await adminService.sendNewsletter({ subject, message });
      setStatus({ type: 'success', text: 'تم إرسال النشرة البريدية لجميع المستخدمين بنجاح!' });
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus({ type: 'error', text: err || 'فشل إرسال النشرة البريدية' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-4xl shadow-2xl overflow-hidden border border-emerald-100">
          <div className="p-8 bg-linear-to-r from-emerald-800 to-emerald-600 text-white">
            <h2 className="text-3xl font-black">إرسال نشرة بريدية</h2>
            <p className="opacity-80 mt-2">تواصل مع جميع أعضاء المنصة عبر البريد الإلكتروني</p>
          </div>

          <form onSubmit={handleSend} className="p-8 space-y-6">
            {status && (
              <div className={`p-4 rounded-2xl font-bold text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.text}
              </div>
            )}

            <FormInput 
              label="عنوان الرسالة" 
              placeholder="مثال: تحديثات جديدة في منصتنا"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <div className="space-y-2">
              <label className="block text-emerald-900 font-bold">محتوى الرسالة</label>
              <textarea 
                className="w-full bg-[#f4f1eb] border border-[#d6c6a8] rounded-2xl px-5 py-4 outline-none min-h-[200px] focus:ring-2 focus:ring-emerald-500"
                placeholder="اكتب رسالتك هنا..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <FormButton 
              text={loading ? "جاري الإرسال..." : "إرسال للنشرة البريدية"} 
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default NewsletterAdmin;
