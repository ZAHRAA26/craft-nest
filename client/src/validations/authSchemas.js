import * as yup from 'yup'

export const getRegisterSchema = (t) => {
  return yup.object({
    name: yup
      .string()
      .min(3, t('auth:errors.name_min'))
      .required(t('auth:errors.name_required')),

    email: yup
      .string()
      .email(t('auth:errors.email_invalid'))
      .required(t('auth:errors.email_required')),

    password: yup
      .string()
      .min(8, t('auth:errors.password_min'))
      .required(t('auth:errors.password_required')),

    craftSpecialty: yup
      .string()
      .required(t('auth:errors.craft_required')),

    bio: yup
      .string()
      .min(20, t('auth:errors.bio_min'))
      .required(t('auth:errors.bio_required')),
  })
}

export const getLoginSchema = (t) => {
  return yup.object({
    email: yup
      .string()
      .email(t('auth:errors.email_invalid'))
      .required(t('auth:errors.email_required')),
    password: yup
      .string()
      .min(8, t('auth:errors.password_min'))
      .required(t('auth:errors.password_required')),
  })
}
