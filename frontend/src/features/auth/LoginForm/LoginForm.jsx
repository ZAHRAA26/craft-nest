import React from 'react'
import FormInput from '../../../components/FormInput/FormInput'
import FormButton from '../../../components/FormButton/FormButton'
import { Link } from 'react-router-dom'
import logo from "../../../../public/Nest.png"



function LoginForm() {
  return (
  <div className="min-h-screen bg-[#edf3ee] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="w-full max-w-xl relative z-10">
        {/* Top Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-700 to-emerald-500 shadow-xl flex items-center justify-center text-white text-3xl">
            <img src={logo}  alt='craft nest logo'/>
          </div>

          <h1 className="text-4xl font-black text-emerald-900 mt-5">
سجل دخول
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
                  بيانات تسجيل الدخول
                </h2>
            
            </div>
          </div>

          {/* Form */}
          <form
            className="p-8 md:p-10 space-y-7"
          >
           

            {/* Input 2*/}
            <FormInput
              label={"البريد الالكتروني"}
              type="email"
              placeholder="ahmed@gmail.com"
             
            />

            {/* Input 3*/}
            <FormInput
              label={"كلمة السر"}
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
             
            />

          

            {/* Button */}
            <FormButton text={"نسجيل الدخول"} type="submit" />

            {/* Forget Password */}
            <p className="text-center text-emerald-900 font-medium">
              <Link to={"#"} className="font-black cursor-pointer mr-1">نسيت كلمة المرور </Link>
            </p>
          </form>
        </div>
      </div>
    </div>   
  )
}

export default LoginForm
