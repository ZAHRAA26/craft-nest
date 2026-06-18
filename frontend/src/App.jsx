import './App.css'
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchMe, selectAuthLoading } from './store/slices/authSlice';

// Features
import LoginForm from "./features/auth/LoginForm/LoginForm";
import RegistrationForm from "./features/auth/RegistrationForm/RegistrationForm";
import ForgotPassword from "./features/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword/ResetPassword";
import VerifyEmail from "./features/auth/VerifyEmail/VerifyEmail";
import ProtectedRoute from "./components/common/ProtectedRoute";
import UserManagement from "./features/admin/UserManagement";
import AdminDashboard from "./features/admin/AdminDashboard";
import NewsletterAdmin from "./features/admin/NewsletterAdmin";
import UserDashboard from "./features/profile/UserDashboard";
import CraftsmanDashboard from "./features/profile/CraftsmanDashboard";
import Navbar from "./components/common/Navbar";
import GlobalLoader from "./components/common/GlobalLoader";

// Smart Dashboard Switcher
const DashboardSelector = () => {
  const user = useSelector((state) => state.auth.user);
  
  if (user?.role === 'ADMIN') return <AdminDashboard />;
  if (user?.role === 'CRAFTSMAN') return <CraftsmanDashboard />;
  return <UserDashboard />;
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const globalLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(fetchMe());
    }
    
    // Set initial direction and language
    const lang = i18n.language || 'ar';
    document.documentElement.dir = lang.startsWith('ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [dispatch, i18n.language]);

  // Don't show Navbar on Auth/Utility pages
  const hideNavbar = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'].includes(location.pathname);

  return (
    <div className="App transition-all duration-500">
      {globalLoading && <GlobalLoader message={t('common:loading_message') || 'جاري التحميل...'} />}
      
      {!hideNavbar && <Navbar />}
      
      <main className={`${!hideNavbar ? 'pt-0' : ''}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected Main Entry (Role-Based) */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardSelector />
              </ProtectedRoute>
            } 
          />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute adminOnly={true}>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/newsletter" 
            element={
              <ProtectedRoute adminOnly={true}>
                <NewsletterAdmin />
              </ProtectedRoute>
            } 
          />

          {/* 404 - Not Found */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center text-center p-20">
              <div className="space-y-6">
                <h1 className="text-9xl font-black text-emerald-100">404</h1>
                <p className="text-2xl font-bold text-emerald-900">أوبس! الصفحة غير موجودة</p>
                <button onClick={() => window.history.back()} className="text-emerald-600 font-bold hover:underline underline-offset-8">العودة للوراء</button>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
