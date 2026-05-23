import React from 'react'

function FormInput({
  label,
  type = "text",
  placeholder = "",
  error,
  className = "",
  ...props
}) {
   return (
    <div className="w-full">
      <label className="block text-right text-emerald-900 font-bold mb-3">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={`
          w-full
          bg-[#f4f1eb]
          border
          border-[#d6c6a8]
          rounded-2xl
          px-5
          py-4
          outline-none
          text-right
          transition-all
          duration-300
          focus:ring-2
          focus:ring-emerald-500
          focus:border-emerald-500
          placeholder:text-[#b7b09f]
          ${error ? "border-red-500 focus:ring-red-400" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-sm mt-2 text-right">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput
