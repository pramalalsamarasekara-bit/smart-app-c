// /i18n/index.ts
export { default } from './i18nInstance';
export { default as i18n } from './i18nInstance';
// i18n/index.ts  (NO JSX here!)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// locales (ඔයාට තියෙන ඉතිරි JSON වලට match කරන්න)
import en from './locales/en.json';
import si from './locales/si.json';
import ta from './locales/ta.json';
import ar from './locales/ar.json';
import zh from './locales/zh.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  si: { translation: si },
  ta: { translation: ta },
  ar: { translation: ar },
  zh: { translation: zh },
  hi: { translation: hi },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      keySeparator: false,
      nsSeparator: false,
    })
    .catch(() => {});
}

export default i18n;