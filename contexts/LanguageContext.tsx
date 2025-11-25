// contexts/LanguageContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

export type LangKey = 'en' | 'si' | 'ar' | 'ta' | 'hi' | 'ur';

export type LangOption = {
  key: LangKey;
  name: string;
  rtl?: boolean;
};

type Dict = Record<string, string>;
type Dictionaries = Record<LangKey, Dict>;

const STORAGE_KEY = '@smart-shopping-language';

// 🔤 භාෂා ලැයිස්තුව – HomeScreen එකේ languages.find(...) use කරනවා
export const LANG_OPTIONS: LangOption[] = [
  { key: 'en', name: 'English' },
  { key: 'si', name: 'සිංහල' },
  { key: 'ar', name: 'العربية', rtl: true },
  { key: 'ta', name: 'தமிழ்' },
  { key: 'hi', name: 'हिन्दी' },
  { key: 'ur', name: 'اردو', rtl: true },
];

// 🗣️ භාෂා dictionary – keys useLanguage().t('key') වලට
const dictionaries: Dictionaries = {
  en: {
    appName: 'Smart Shopping',
    welcomeTitle: 'Welcome',
    welcomeSubtitle: 'Your Intilegent Shopping Companion',
    selectLanguage: 'Select language',
    changeLanguage: 'Change language',
    home: 'Home',
    search: 'Search',
    scanQr: 'Scan QR Code',
    scanBarcode: 'Scan Barcode',
    scanImage: 'Scan Image',
    voiceSearch: 'Voice Search',
    aiAssistant: 'AI Assistant',
    cart: 'Cart',
    offers: 'Offers',
    orders: 'Orders',
    favorites: 'Favorites',
    marketplace: 'Marketplace',
    profile: 'Profile',
    settings: 'Settings',
    helpAndSupport: 'Help & Support',
    aboutApp: 'About App',
    logout: 'Logout',
    comingSoonTitle: 'Coming soon',
    comingSoon: 'This page will be available soon.',
    permission: 'Permission',
    cameraPermissionRequired: 'Camera permission is required.',
    galleryPermissionRequired: 'Gallery permission is required.',
    ok: 'OK',
    cancel: 'Cancel',
  },

  si: {
    appName: 'Smart Shopping',
    welcomeTitle: 'ආයුබෝවන්',
    welcomeSubtitle: 'ඔබේ බුද්ධිමත් සාප්පු සවාරි සහකාරිය',
    selectLanguage: 'භාෂාව තෝරන්න',
    changeLanguage: 'භාෂාව වෙනස් කරන්න',
    home: 'මුල් පිටුව',
    search: 'සෙවීම',
    scanQr: 'QR කේතය ස්කෑන් කරන්න',
    scanBarcode: 'බාර්කෝඩ් ස්කෑන් කරන්න',
    scanImage: 'ඡායාරූපය ස්කෑන් කරන්න',
    voiceSearch: 'හඬ සෙවුම',
    aiAssistant: 'AI හවුල්කාරයා',
    cart: 'ව්‍යාපාර ටොකරුව',
    offers: 'ඇපන් / Offers',
    orders: 'ඇණවුම්',
    favorites: 'පැරණි කැමති',
    marketplace: 'Market Place',
    profile: 'පුරුක',
    settings: 'සැකසුම්',
    helpAndSupport: 'උදව් සහ සහාය',
    aboutApp: 'යෙදුම ගැන',
    logout: 'නික්ම යන්න',
    comingSoonTitle: 'ඉක්මනින්',
    comingSoon: 'මෙම පිටුව ඉක්මනින් ලබා ගත හැකි වේ.',
    permission: 'අවසරය',
    cameraPermissionRequired: 'කැමරා අවසරය අවශ්‍යයි.',
    galleryPermissionRequired: 'ගැලරිය භාවිතා කිරීමට අවසරය අවශ්‍යයි.',
    ok: 'හරි',
    cancel: 'අවලංගු කරන්න',
  },

  ar: {
    appName: 'Smart Shopping',
    welcomeTitle: 'أهلاً بك',
    welcomeSubtitle: 'مساعد التسوق الذكي المدعوم بالذكاء الاصطناعي',
    selectLanguage: 'اختر اللغة',
    changeLanguage: 'تغيير اللغة',
    home: 'الرئيسية',
    search: 'بحث',
    scanQr: 'مسح رمز QR',
    scanBarcode: 'مسح الباركود',
    scanImage: 'مسح الصورة',
    voiceSearch: 'بحث صوتي',
    aiAssistant: 'مساعد ذكي',
    cart: 'عربة التسوق',
    offers: 'عروض',
    orders: 'الطلبات',
    favorites: 'المفضلة',
    marketplace: 'السوق',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    helpAndSupport: 'المساعدة والدعم',
    aboutApp: 'عن التطبيق',
    logout: 'تسجيل الخروج',
    comingSoonTitle: 'قريباً',
    comingSoon: 'هذه الصفحة ستكون متاحة قريباً.',
    permission: 'صلاحية',
    cameraPermissionRequired: 'صلاحية الكاميرا مطلوبة.',
    galleryPermissionRequired: 'صلاحية المعرض مطلوبة.',
    ok: 'حسناً',
    cancel: 'إلغاء',
  },

  ta: {
    appName: 'Smart Shopping',
    welcomeTitle: 'வரவேற்கிறோம்',
    welcomeSubtitle: 'உங்கள் AI ஸ்மார்ட் ஷாப்பிங் உதவியாளர்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    changeLanguage: 'மொழியை மாற்றவும்',
    home: 'முகப்பு',
    search: 'தேடல்',
    scanQr: 'QR குறியீட்டை ஸ்கேன் செய்யவும்',
    scanBarcode: 'பார்கோடை ஸ்கேன் செய்யவும்',
    scanImage: 'படத்தை ஸ்கேன் செய்யவும்',
    voiceSearch: 'குரல் தேடல்',
    aiAssistant: 'AI உதவியாளர்',
    cart: 'வண்டி',
    offers: 'சலுகைகள்',
    orders: 'ஆர்டர்கள்',
    favorites: 'பிடித்தவை',
    marketplace: 'மார்க்கெட் பிளேஸ்',
    profile: 'சுயவிவரம்',
    settings: 'அமைப்புகள்',
    helpAndSupport: 'உதவி & ஆதரவு',
    aboutApp: 'அப்பைப் பற்றி',
    logout: 'வெளியேறு',
    comingSoonTitle: 'விரைவில்',
    comingSoon: 'இந்த பக்கம் விரைவில் கிடைக்கும்.',
    permission: 'அனுமதி',
    cameraPermissionRequired: 'கேமரா அனுமதி தேவை.',
    galleryPermissionRequired: 'கேலரி அனுமதி தேவை.',
    ok: 'சரி',
    cancel: 'ரத்து செய்',
  },

  hi: {
    appName: 'Smart Shopping',
    welcomeTitle: 'स्वागत है',
    welcomeSubtitle: 'आपका एआई स्मार्ट शॉपिंग सहायक',
    selectLanguage: 'भाषा चुनें',
    changeLanguage: 'भाषा बदलें',
    home: 'होम',
    search: 'खोजें',
    scanQr: 'QR कोड स्कैन करें',
    scanBarcode: 'बारकोड स्कैन करें',
    scanImage: 'इमेज स्कैन करें',
    voiceSearch: 'वॉइस सर्च',
    aiAssistant: 'एआई असिस्टेंट',
    cart: 'कार्ट',
    offers: 'ऑफर',
    orders: 'ऑर्डर',
    favorites: 'पसंदीदा',
    marketplace: 'मार्केटप्लेस',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    helpAndSupport: 'मदद और सहायता',
    aboutApp: 'ऐप के बारे में',
    logout: 'लॉग आउट',
    comingSoonTitle: 'जल्द आ रहा है',
    comingSoon: 'यह पेज जल्दी ही उपलब्ध होगा।',
    permission: 'अनुमति',
    cameraPermissionRequired: 'कैमरा अनुमति आवश्यक है।',
    galleryPermissionRequired: 'गैलरी अनुमति आवश्यक है।',
    ok: 'ठीक है',
    cancel: 'रद्द करें',
  },

  ur: {
    appName: 'Smart Shopping',
    welcomeTitle: 'خوش آمدید',
    welcomeSubtitle: 'آپ کا اے آئی اسمارٹ شاپنگ اسسٹنٹ',
    selectLanguage: 'زبان منتخب کریں',
    changeLanguage: 'زبان تبدیل کریں',
    home: 'ہوم',
    search: 'تلاش',
    scanQr: 'کیو آر کوڈ اسکین کریں',
    scanBarcode: 'بارکوڈ اسکین کریں',
    scanImage: 'تصویر اسکین کریں',
    voiceSearch: 'آواز سے تلاش',
    aiAssistant: 'اے آئی اسسٹنٹ',
    cart: 'کارٹ',
    offers: 'آفرز',
    orders: 'آرڈرز',
    favorites: 'پسندیدہ',
    marketplace: 'مارکیٹ پلیس',
    profile: 'پروفائل',
    settings: 'سیٹنگز',
    helpAndSupport: 'مدد اور سپورٹ',
    aboutApp: 'ایپ کے بارے میں',
    logout: 'لاگ آؤٹ',
    comingSoonTitle: 'جلد آ رہا ہے',
    comingSoon: 'یہ صفحہ جلد دستیاب ہوگا۔',
    permission: 'اجازت',
    cameraPermissionRequired: 'کیمرہ کی اجازت درکار ہے۔',
    galleryPermissionRequired: 'گیلری کی اجازت درکار ہے۔',
    ok: 'ٹھیک ہے',
    cancel: 'منسوخ کریں',
  },
};

type LanguageContextValue = {
  lang: LangKey;
  isRTL: boolean;
  isReady: boolean;
  languages: LangOption[];
  t: (key: string) => string;
  changeLanguage: (lang: LangKey) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export function LanguageProvider({ children }: Props) {
  const [lang, setLang] = useState<LangKey>('en');
  const [isReady, setIsReady] = useState(false);

  // initial load
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const storedLang = saved as LangKey | null;

        const next = storedLang && LANG_OPTIONS.find(l => l.key === storedLang)
          ? storedLang
          : 'en';

        setLang(next);
        const option = LANG_OPTIONS.find(l => l.key === next);
        I18nManager.allowRTL(!!option?.rtl);
        I18nManager.forceRTL(!!option?.rtl);
      } catch (e) {
        // ignore and keep default 'en'
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const changeLanguage = async (nextLang: LangKey) => {
    setLang(nextLang);
    await AsyncStorage.setItem(STORAGE_KEY, nextLang);

    const option = LANG_OPTIONS.find(l => l.key === nextLang);
    I18nManager.allowRTL(!!option?.rtl);
    I18nManager.forceRTL(!!option?.rtl);
  };

  const value = useMemo<LanguageContextValue>(() => {
    const dict = dictionaries[lang] || dictionaries.en;
    const isRTL = !!LANG_OPTIONS.find(l => l.key === lang)?.rtl;

    const t = (key: string): string => {
      return dict[key] ?? dictionaries.en[key] ?? key;
    };

    return {
      lang,
      isRTL,
      isReady,
      languages: LANG_OPTIONS, // 🔧 මෙතනින් HomeScreen එකට languages array එක යනවා
      t,
      changeLanguage,
    };
  }, [lang, isReady]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
