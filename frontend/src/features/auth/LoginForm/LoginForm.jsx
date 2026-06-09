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
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#f9f8f4] rounded-4xl shadow-2xl overflow-hidden border border-emerald-100">

          {/* Header */}
          <div className="bg-linear-to-r from-[#143d2d] to-[#2d8b57] p-8">
            <div className="text-right">
              <h2 className="text-3xl font-black text-white">
                بيانات تسجيل الدخول
              </h2>
            </div>
          </div>

          {/* Form */}
          <form
            className="p-8 md:p-10 space-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* Server Error */}
            {serverError && (
              <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-xl py-2 px-4">
                {serverError}
              </p>
            )}

            {/* Email */}
            <FormInput
              label="البريد الالكتروني"
              type="email"
              placeholder="ahmed@gmail.com"
              {...register("email")}
              error={errors.email?.message}
            />

            {/* Password */}
            <FormInput
              label="كلمة السر"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />

            {/* Submit Button */}
            <FormButton
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

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;