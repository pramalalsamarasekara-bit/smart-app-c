// i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Use require to avoid TS config tweaks
const en = require('./locales/en.json');
const si = require('./locales/si.json');
const ar = require('./locales/ar.json');
const hi = require('./locales/hi.json');
const zh = require('./locales/zh.json');
const ta = require('./locales/ta.json');

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    si: { translation: si },
    ar: { translation: ar },
    hi: { translation: hi },
    zh: { translation: zh },
    ta: { translation: ta },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
