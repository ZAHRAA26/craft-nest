import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  logoutUser,
  selectUser,
  selectIsAuthenticated,
  clearCredentials,
} from "../../store/slices/authSlice";
import logo from "../../../public/Nest.png";

const Navbar = () => {
  const { t, i18n } = useTranslation(["common"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = async () => {
    if (
      window.confirm(
        t("common:confirm_logout") || "هل أنت متأكد من تسجيل الخروج؟",
      )
    ) {
      try {
        await dispatch(logoutUser()).unwrap();
        navigate("/login");
      } catch (error) {
        dispatch(clearCredentials());
        navigate("/login");
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <nav className="bg-white border-b border-emerald-100 px-6 py-4 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Main Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center p-1 shadow-md">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-black text-emerald-900 hidden md:block">
              {i18n.language === "ar" ? "كرافتس" : "Crafts"}
            </span>
          </Link>

          {isAuthenticated && (
            <div className="hidden md:flex gap-6">
              <Link
                to="/"
                className="text-emerald-800 font-bold hover:text-emerald-600 transition-colors"
              >
                {t("home")}
              </Link>
              {user?.role === "ADMIN" && (
                <Link
                  to="/admin/users"
                  className="text-emerald-800 font-bold hover:text-emerald-600 transition-colors"
                >
                  {t("admin_users") || "إدارة الأعضاء"}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* User Actions & Lang Switcher */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 border border-emerald-200 rounded-lg text-emerald-700 font-bold hover:bg-emerald-50 transition-all text-sm cursor-pointer"
          >
            {t("lang_name")}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
              )}
              <div
                className={`text-right ${i18n.language === "en" ? "text-left" : "text-right"} hidden sm:block`}
              >
                <p className="text-sm font-black text-emerald-900">
                  {user?.name}
                </p>
                <p className="text-xs text-emerald-600 opacity-80">
                  {user?.role === "ADMIN" ? t("admin") : "Member"}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-5 py-2 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100 cursor-pointer shadow-sm active:scale-95"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="text-emerald-800 font-bold px-4 py-2 hover:text-emerald-600 transition-colors"
              >
                {t("login")}
              </Link>
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all hover:-translate-y-0.5"
              >
                {t("register")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
