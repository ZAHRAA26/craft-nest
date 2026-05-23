import React from 'react'
function FormButton({
  text,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        w-full
        bg-linear-to-r
        from-[#2d7c57]
        to-[#49b177]
        hover:opacity-95
        transition-all
        duration-300
        text-white
        font-black
        py-4
        rounded-2xl
        shadow-lg
        text-lg
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {text}
    </button>
  );
}

export default FormButton
