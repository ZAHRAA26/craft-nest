import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Layout components and global styles for professional look
 */
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <header className="bg-emerald-900 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold">لوحة التحكم - كرافتس</h1>
        <nav>
          <ul className="flex gap-6">
            <li><Link to="/" className="hover:text-emerald-200">الرئيسية</Link></li>
            <li><Link to="/admin/users" className="hover:text-emerald-200">إدارة الأعضاء</Link></li>
            <li><Link to="/admin/newsletter" className="hover:text-emerald-200">النشرة الإخبارية</Link></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-6 md:p-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
