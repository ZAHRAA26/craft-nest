import React, { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(props, ref) {
  const {
    label,
    type,
    placeholder = "",
    error,
    className = "w-full bg-[#f4f1eb] border border-[#d6c6a8] rounded-2xl px-5 py-4 outline-none text-right transition-all duration-300   focus:ring-2  focus:ring-emerald-500  focus:border-emerald-500 placeholder:text-[#b7b09f]",
    ...otherProps
  } = props;
  return (
    <div className="w-full">
      <label className="block text-right text-emerald-900 font-bold mb-3">{label}</label>
      <input
        ref={ref}
        {...otherProps}
        className={className}
        type={type}
        placeholder={placeholder}
      />
      
         {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}

    </div>
  );
});
export default FormInput;