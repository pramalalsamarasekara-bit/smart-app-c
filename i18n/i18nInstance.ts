// i18n/i18nInstance.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import si from './locales/si.json';
import ta from './locales/ta.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import zh from './locales/zh.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en', // default
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    si: { translation: si },
    ta: { translation: ta },
    ar: { translation: ar },
    hi: { translation: hi },
    zh: { translation: zh },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
