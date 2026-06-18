import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectIsAdmin, selectAuthLoading } from '../../store/slices/authSlice';

/**
 * ProtectedRoute - يحمي المسارات من الوصول غير المصرح به
 * @param {boolean} adminOnly - لو المسار مخصص للآدمن فقط
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const loading = useSelector(selectAuthLoading);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf3ee]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // توجيه المستخدم لصفحة تسجيل الدخول مع حفظ المسار اللي كان رايحه
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    // لو مش آدمن وهو داخل مسار آدمن، رجعه للرئيسية
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
