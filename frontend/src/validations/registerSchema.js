// src/validations/registerSchema.js
import * as yup from 'yup'

const messages = {
  ar: {
    name: {
      min: 'الاسم لازم يكون 3 حروف على الأقل',
      required: 'الاسم مطلوب',
    },
    email: {
      email: 'البريد الإلكتروني غير صحيح',
      required: 'البريد الإلكتروني مطلوب',
    },
    password: {
      min: 'كلمة السر لازم تكون 8 أحرف على الأقل',
      uppercase: 'لازم تحتوي على حرف كبير',
      number: 'لازم تحتوي على رقم',
      required: 'كلمة السر مطلوبة',
    },
    craftSpecialty: {
      required: 'اختر تخصصك',
    },
    bio: {
      min: 'البيو لازم تكون 20 حرف على الأقل',
      max: 'البيو لازم تكون أقل من 500 حرف',
      required: 'البيو مطلوبة',
    },
  },

  en: {
    name: {
      min: 'Name must be at least 3 characters',
      required: 'Name is required',
    },
    email: {
      email: 'Invalid email address',
      required: 'Email is required',
    },
    password: {
      min: 'Password must be at least 8 characters',
      uppercase: 'Must contain an uppercase letter',
      number: 'Must contain a number',
      required: 'Password is required',
    },
    craftSpecialty: {
      required: 'Please select your specialty',
    },
    bio: {
      min: 'Bio must be at least 20 characters',
      max: 'Bio must be less than 500 characters',
      required: 'Bio is required',
    },
  },
}

export const getRegisterSchema = (lang = 'ar') => {
  const m = messages[lang]

  return yup.object({
    name: yup
      .string()
      .min(3, m.name.min)
      .required(m.name.required),

    email: yup
      .string()
      .email(m.email.email)
      .required(m.email.required),

    password: yup
      .string()
      .min(8, m.password.min)
      .matches(/[A-Z]/, m.password.uppercase)
      .matches(/[0-9]/, m.password.number)
      .required(m.password.required),

    craftSpecialty: yup
      .string()
      .required(m.craftSpecialty.required),

    bio: yup
      .string()
      .min(20, m.bio.min)
      .max(500, m.bio.max)
      .required(m.bio.required),
  })
}