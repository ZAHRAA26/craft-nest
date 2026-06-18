<<<<<<< HEAD
import React from "react";
import FormInput from "../../../components/FormInput/FormInput";
import FormButton from "../../../components/FormButton/FormButton";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../public/Nest.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import api from "../../../services/api";
import { setCredentials } from "../../../store/slices/authSlice";

// --------- Validation Schema ---------
const lang = localStorage.getItem("lang") || "ar";

const messages = {
  ar: {
    email: {
      email: "البريد الإلكتروني غير صحيح",
      required: "البريد الإلكتروني مطلوب",
    },
    password: {
      min: "كلمة السر لازم تكون 8 أحرف على الأقل",
      required: "كلمة السر مطلوبة",
    },
  },
  en: {
    email: {
      email: "Invalid email address",
      required: "Email is required",
    },
    password: {
      min: "Password must be at least 8 characters",
      required: "Password is required",
    },
  },
};

const m = messages[lang];

const loginSchema = yup.object({
  email: yup.string().email(m.email.email).required(m.email.required),
  password: yup.string().min(8, m.password.min).required(m.password.required),
});

// --------- Component ---------
function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [serverError, setServerError] = React.useState(null);

  const onSubmit = async (formData) => {
    try {
      setServerError(null);
      const response = await api.post("/auth/login", formData);
      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
        })
      );
      navigate("/");
    } catch (error) {
      setServerError(
        lang === "ar"
          ? "البريد الإلكتروني أو كلمة السر غلط"
          : "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#edf3ee] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="w-full max-w-xl relative z-10">

        {/* Top Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-700 to-emerald-500 shadow-xl flex items-center justify-center text-white text-3xl">
            <img src={logo} alt="craft nest logo" />
          </div>

          <h1 className="text-4xl font-black text-emerald-900 mt-5">
            سجل دخول
          </h1>

          <p className="text-emerald-700 mt-2 text-sm">
            منصة الحرف اليدوية والصناعة الرقمية
=======
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import FormInput from "../../../components/FormInput/FormInput";
import FormButton from "../../../components/FormButton/FormButton";
import { getLoginSchema } from "../../../validations/authSchemas";
import { 
  loginUser, 
  selectAuthLoading, 
  selectAuthError, 
  selectIsAuthenticated,
  resetAuthState 
} from "../../../store/slices/authSlice";

import logo from "../../../../public/Nest.png";

function LoginForm() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getLoginSchema(t)),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const onSubmit = (formData) => {
    dispatch(loginUser(formData));
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <div className="min-h-screen bg-[#edf3ee] flex items-center justify-center px-4 py-10 relative overflow-hidden" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Floating Language Switcher */}
      <div className="absolute top-6 left-6 right-6 flex justify-end z-50">
        <button 
          onClick={toggleLanguage}
          className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-100 shadow-sm font-bold text-emerald-800 hover:bg-emerald-50 transition-all cursor-pointer flex items-center gap-2"
        >
          <span className="text-xl">🌐</span>
          {t('common:lang_name')}
        </button>
      </div>

      <div className="w-full max-w-xl relative z-10 animate-fade-in">

        {/* Top Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-700 to-emerald-500 shadow-xl flex items-center justify-center text-white transition-transform hover:scale-105 duration-300">
            <img src={logo} alt="craft nest logo" className="w-14 h-14 object-contain" />
          </div>

          <h1 className="text-4xl font-black text-emerald-900 mt-6 tracking-tight">
            {t('auth:login_title')}
          </h1>

          <p className="text-emerald-700 mt-2 text-sm font-medium opacity-80 text-center">
            {t('common:subtitle')}
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
          </p>
        </div>

        {/* Card */}
<<<<<<< HEAD
        <div className="bg-[#f9f8f4] rounded-4xl shadow-2xl overflow-hidden border border-emerald-100">

          {/* Header */}
          <div className="bg-linear-to-r from-[#143d2d] to-[#2d8b57] p-8">
            <div className="text-right">
              <h2 className="text-3xl font-black text-white">
                بيانات تسجيل الدخول
              </h2>
            </div>
=======
        <div className="bg-[#f9f8f4] rounded-4xl shadow-2xl overflow-hidden border border-emerald-100/50 backdrop-blur-sm">

          {/* Header */}
          <div className="bg-linear-to-r from-[#143d2d] to-[#2d8b57] p-8">
            <h2 className="text-2xl font-black text-white text-center sm:text-right">
              {i18n.language === 'ar' ? 'بيانات تسجيل الدخول' : 'Sign In Details'}
            </h2>
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
          </div>

          {/* Form */}
          <form
            className="p-8 md:p-10 space-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >

<<<<<<< HEAD
            {/* Server Error */}
            {serverError && (
              <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-xl py-2 px-4">
                {serverError}
              </p>
=======
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl text-sm font-bold shadow-sm animate-shake">
                {error}
              </div>
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
            )}

            {/* Email */}
            <FormInput
<<<<<<< HEAD
              label="البريد الالكتروني"
              type="email"
              placeholder="ahmed@gmail.com"
=======
              label={t('auth:email')}
              type="email"
              placeholder={t('auth:email_placeholder')}
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
              {...register("email")}
              error={errors.email?.message}
            />

            {/* Password */}
            <FormInput
<<<<<<< HEAD
              label="كلمة السر"
              type="password"
              placeholder="••••••••"
=======
              label={t('auth:password')}
              type="password"
              placeholder={t('auth:password_placeholder')}
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
              {...register("password")}
              error={errors.password?.message}
            />

            {/* Submit Button */}
            <FormButton
<<<<<<< HEAD
              text={isSubmitting ? "جاري الدخول..." : "تسجيل الدخول"}
              type="submit"
              disabled={isSubmitting}
            />

            {/* Forget Password */}
            <p className="text-center text-emerald-900 font-medium">
              <Link to="#" className="font-black cursor-pointer mr-1">
                نسيت كلمة المرور
              </Link>
            </p>
=======
              text={loading ? t('auth:submitting') : t('auth:submit_login')}
              type="submit"
              disabled={loading}
              className="py-5 text-xl"
            />

            {/* Links */}
            <div className="flex flex-col gap-5 mt-6 border-t border-emerald-100/50 pt-6">
              <p className="text-center text-emerald-900 font-bold">
                <Link to="/forgot-password" size="sm" className="text-emerald-700 hover:text-emerald-500 transition-colors underline underline-offset-4">
                  {t('auth:forgot_password')}
                </Link>
              </p>
              
              <p className="text-center text-emerald-900 font-bold">
                {t('auth:no_account')}
                <Link to="/register" className="text-emerald-600 hover:text-emerald-500 transition-colors mx-2 underline underline-offset-4 decoration-2">
                  {t('auth:create_account')}
                </Link>
              </p>
            </div>
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;