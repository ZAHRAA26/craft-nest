<<<<<<< HEAD
import axios from "axios";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput/FormInput";
import FormButton from "../../../components/FormButton/FormButton";
import CraftSelect from "../../../components/CraftSelect/CraftSelect";
import { getRegisterSchema } from "../../../validations/registerSchema";
import { Link } from "react-router-dom";
import logo from "../../../../public/Nest.png"



function RegistrationForm() {
  const lang = localStorage.getItem("lang") || "ar";
=======
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import FormInput from "../../../components/FormInput/FormInput";
import FormButton from "../../../components/FormButton/FormButton";
import CraftSelect from "../../../components/CraftSelect/CraftSelect";
import { getRegisterSchema } from "../../../validations/authSchemas";
import { 
  registerUser, 
  selectAuthLoading, 
  selectAuthError, 
  selectAuthSuccess, 
  resetAuthState 
} from "../../../store/slices/authSlice";

import logo from "../../../../public/Nest.png";

function RegistrationForm() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const success = useSelector(selectAuthSuccess);

>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
<<<<<<< HEAD
    resolver: yupResolver(getRegisterSchema(lang)),
  });
  const registrationFormSubmission = async (formData) => {
    try {
      // let response = await axios.post(
      //   "https://e-commerce-api-kmhw.vercel.app/api/register",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   },
      // );
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf3ee] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="w-full max-w-xl relative z-10">
        {/* Top Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-700 to-emerald-500 shadow-xl flex items-center justify-center text-white text-3xl">
            <img src={logo}  alt='craft nest logo'/>
          </div>

          <h1 className="text-4xl font-black text-emerald-900 mt-5">
            إنشاء حساب جديد
          </h1>

          <p className="text-emerald-700 mt-2 text-sm">
            منصة الحرف اليدوية والصناعة الرقمية
          </p>
        </div>

        {/* Card : header and form*/}
        <div className="bg-[#f9f8f4] rounded-4xl shadow-2xl overflow-hidden border border-emerald-100">
          {/* Header */}
          <div className="bg-linear-to-r from-[#143d2d] to-[#2d8b57] p-8">
              <div className="text-right">
                <h2 className="text-3xl font-black text-white">
                  بياناتك الأساسية
                </h2>
            
            </div>
=======
    resolver: yupResolver(getRegisterSchema(t)),
  });

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetAuthState());
        navigate("/login");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const onSubmit = (formData) => {
    const lang = i18n.language;
    const submissionData = {
      ...formData,
      bio: { [lang]: formData.bio },
      craftSpecialty: [formData.craftSpecialty]
    };
    dispatch(registerUser(submissionData));
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
            {t('auth:register_title')}
          </h1>

          <p className="text-emerald-700 mt-2 text-sm font-medium opacity-80">
            {t('common:subtitle')}
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#f9f8f4] rounded-4xl shadow-2xl overflow-hidden border border-emerald-100/50 backdrop-blur-sm">
          {/* Header */}
          <div className="bg-linear-to-r from-[#143d2d] to-[#2d8b57] p-8">
            <h2 className="text-2xl font-black text-white text-center sm:text-right">
              {i18n.language === 'ar' ? 'بياناتك الأساسية' : 'Basic Information'}
            </h2>
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
          </div>

          {/* Form */}
          <form
            className="p-8 md:p-10 space-y-7"
<<<<<<< HEAD
            onSubmit={handleSubmit(registrationFormSubmission)}
          >
            {/* Input 1*/}
            <FormInput
              label={"الاسم بالكامل"}
              placeholder="احمد محمد"
              {...register("name")}
              error={errors.name?.message}
            />

            {/* Input 2*/}
            <FormInput
              label={"البريد الالكتروني"}
              type="email"
              placeholder="ahmed@gmail.com"
              {...register("email")}
              error={errors.email?.message}
            />

            {/* Input 3*/}
            <FormInput
              label={"كلمة السر"}
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              {...register("password")}
              error={errors.password?.message}
            />

            {/* Select  */}
            {/* <CraftSelect
              {...register("craftSpecialty")}
              error={errors.craftSpecialty?.message}
            /> */}

            {/* ✅ صح */}
            {/* <div className="flex flex-col gap-1">
              <textarea
                {...register("bio")}
                placeholder="bio"
                className={`border rounded-xl px-4 py-3 outline-none resize-none h-28
                ${errors.bio ? "border-red-400" : "border-emerald-200"}`}
              />
              {errors.bio && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div> */}

            {/* Button */}
            <FormButton text={"انشاء حساب"} type="submit" />

            {/* Login */}
            <p className="text-center text-emerald-900 font-medium">
              لديك حساب بالفعل؟
              <Link to={"/login"} className="font-black cursor-pointer mr-1">سجل دخولك</Link>
=======
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Feedback Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl text-sm font-bold shadow-sm animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-4 rounded-2xl text-sm font-bold shadow-sm">
                {t('auth:success_register')}
              </div>
            )}

            <div className="grid grid-cols-1 gap-7">
              <FormInput
                label={t('auth:name')}
                placeholder={t('auth:name_placeholder')}
                {...register("name")}
                error={errors.name?.message}
              />

              <FormInput
                label={t('auth:email')}
                type="email"
                placeholder={t('auth:email_placeholder')}
                {...register("email")}
                error={errors.email?.message}
              />

              <FormInput
                label={t('auth:password')}
                type="password"
                placeholder={t('auth:password_placeholder')}
                {...register("password")}
                error={errors.password?.message}
              />

              <div className="flex flex-col gap-3">
                <label className="block text-emerald-900 font-bold text-sm uppercase tracking-wider">
                  {t('auth:craft')}
                </label>
                <CraftSelect
                  {...register("craftSpecialty")}
                  error={errors.craftSpecialty?.message}
                />
                {errors.craftSpecialty && (
                  <p className="text-red-500 text-xs font-bold mt-1">{errors.craftSpecialty.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="block text-emerald-900 font-bold text-sm uppercase tracking-wider">
                  {t('auth:bio')}
                </label>
                <textarea
                  {...register("bio")}
                  placeholder={t('auth:bio_placeholder')}
                  className={`w-full bg-[#f4f1eb] border rounded-2xl px-5 py-4 outline-none resize-none h-32 transition-all duration-300 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 placeholder:text-[#b7b09f] font-medium
                  ${errors.bio ? "border-red-400" : "border-[#d6c6a8]"}`}
                />
                {errors.bio && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>
            </div>

            <FormButton 
              text={loading ? t('auth:submitting') : t('auth:submit_register')} 
              type="submit" 
              disabled={loading}
              className="py-5 text-xl"
            />

            <p className="text-center text-emerald-900 font-bold py-2">
              {t('auth:have_account')}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-500 transition-colors mx-2 underline underline-offset-4 decoration-2">
                {t('common:login')}
              </Link>
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
<<<<<<< HEAD
=======

>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
