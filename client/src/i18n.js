import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonAr from './locales/ar/common.json';
import commonEn from './locales/en/common.json';
import authAr from './locales/ar/auth.json';
import authEn from './locales/en/auth.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        common: commonAr,
        auth: authAr,
      },
      en: {
        common: commonEn,
        auth: authEn,
      },
    },
    fallbackLng: 'ar',
    lng: localStorage.getItem('i18nextLng') || 'ar', // Force start with Arabic if no preference
    ns: ['common', 'auth'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

export default i18n;
