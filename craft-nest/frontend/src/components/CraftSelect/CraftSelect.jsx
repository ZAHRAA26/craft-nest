import React from "react";

function CraftSelect(props) {
  return (
    <select
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      dir="rtl"
    >
      <option value="">اختر نوع الحرفة</option>

      <optgroup label="الحرف اليدوية">
        <option value="pottery">خزف</option>
        <option value="ceramics">سيراميك</option>
        <option value="woodwork">أعمال الخشب</option>
        <option value="embroidery">تطريز</option>
        <option value="crochet">كروشيه</option>
        <option value="knitting">تريكو</option>
        <option value="leather_work">جلود</option>
        <option value="jewelry">صناعة الحلي</option>
      </optgroup>

      <optgroup label="التصميم الرقمي">
        <option value="digital_pattern">تصميم باترن رقمي</option>
        <option value="surface_pattern">Surface Pattern</option>
        <option value="seamless_pattern">Seamless Pattern</option>
        <option value="vector_pattern">Vector Pattern</option>
        <option value="illustration_pattern">Illustration Pattern</option>
      </optgroup>
    </select>
  );
}

export default CraftSelect;
