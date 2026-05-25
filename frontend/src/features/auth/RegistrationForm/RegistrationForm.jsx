import axios from "axios";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput/FormInput";
import FormButton from "../../../components/FormButton/FormButton";
import CraftSelect from "../../../components/CraftSelect/CraftSelect";
import { getRegisterSchema } from "../../../validations/registerSchema";

function RegistrationForm() {
  const lang = localStorage.getItem("lang") || "ar";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
            Logo
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
            <div className="flex items-center justify-between">
              <button className="bg-white/15 hover:bg-white/20 transition px-5 py-2 rounded-xl text-white text-sm font-medium">
                رجوع
              </button>

              <div className="text-right">
                <h2 className="text-3xl font-black text-white">
                  بياناتك الأساسية
                </h2>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            className="p-8 md:p-10 space-y-7"
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
            <CraftSelect
              {...register("craftSpecialty")}
              error={errors.craftSpecialty?.message}
            />

            {/* ✅ صح */}
            <div className="flex flex-col gap-1">
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
            </div>

            {/* Button */}
            <FormButton text={"انشاء حساب"} type="submit" />

            {/* Login */}
            <p className="text-center text-emerald-900 font-medium">
              لديك حساب بالفعل؟
              <span className="font-black cursor-pointer mr-1">سجل دخولك</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
