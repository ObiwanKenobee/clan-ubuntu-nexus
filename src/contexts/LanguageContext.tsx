
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
}

export const AFRICAN_LANGUAGES: Language[] = [
  // East Africa
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', region: 'East Africa', flag: '🇰🇪' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', region: 'East Africa', flag: '🇪🇹' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', region: 'East Africa', flag: '🇪🇹' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', region: 'East Africa', flag: '🇪🇷' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaaliga', region: 'East Africa', flag: '🇸🇴' },
  
  // West Africa
  { code: 'ha', name: 'Hausa', nativeName: 'Harshen Hausa', region: 'West Africa', flag: '🇳🇬' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá', region: 'West Africa', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', region: 'West Africa', flag: '🇳🇬' },
  { code: 'ff', name: 'Fulfulde', nativeName: 'Fulfulde', region: 'West Africa', flag: '🇸🇳' },
  { code: 'wo', name: 'Wolof', nativeName: 'Wollof', region: 'West Africa', flag: '🇸🇳' },
  { code: 'tw', name: 'Twi', nativeName: 'Twi', region: 'West Africa', flag: '🇬🇭' },
  { code: 'bm', name: 'Bambara', nativeName: 'Bamanankan', region: 'West Africa', flag: '🇲🇱' },
  
  // Southern Africa
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', region: 'Southern Africa', flag: '🇿🇦' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', region: 'Southern Africa', flag: '🇿🇦' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', region: 'Southern Africa', flag: '🇿🇦' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho', region: 'Southern Africa', flag: '🇱🇸' },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana', region: 'Southern Africa', flag: '🇧🇼' },
  { code: 'sn', name: 'Shona', nativeName: 'chiShona', region: 'Southern Africa', flag: '🇿🇼' },
  
  // Central Africa
  { code: 'ln', name: 'Lingala', nativeName: 'Lingála', region: 'Central Africa', flag: '🇨🇩' },
  { code: 'kg', name: 'Kikongo', nativeName: 'Kikongo', region: 'Central Africa', flag: '🇨🇩' },
  { code: 'sg', name: 'Sango', nativeName: 'Sängö', region: 'Central Africa', flag: '🇨🇫' },
  
  // North Africa
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'North Africa', flag: '🇪🇬' },
  { code: 'ber', name: 'Berber/Tamazight', nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', region: 'North Africa', flag: '🇲🇦' },
  
  // International
  { code: 'en', name: 'English', nativeName: 'English', region: 'International', flag: '🌍' },
  { code: 'fr', name: 'French', nativeName: 'Français', region: 'International', flag: '🇫🇷' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'International', flag: '🇵🇹' }
];

interface TranslationStrings {
  [key: string]: {
    [langCode: string]: string;
  };
}

const translations: TranslationStrings = {
  // Common UI Elements
  'welcome': {
    'en': 'Welcome',
    'sw': 'Karibu',
    'ha': 'Barka da zuwa',
    'yo': 'Káàbọ̀',
    'zu': 'Sawubona',
    'am': 'እንኳን ደህና መጣህ',
    'ar': 'أهلاً وسهلاً',
    'fr': 'Bienvenue'
  },
  'clan_dashboard': {
    'en': 'Clan Dashboard',
    'sw': 'Dashibodi ya Ukoo',
    'ha': 'Dashboard na Kabila',
    'yo': 'Dashboard Ìdílé',
    'zu': 'I-Dashboard Yesizwe',
    'am': 'የቤተሰብ ዳሽቦርድ',
    'ar': 'لوحة القبيلة',
    'fr': 'Tableau de Bord du Clan'
  },
  'elder_council': {
    'en': 'Elder Council',
    'sw': 'Baraza la Wazee',
    'ha': 'Majalisar Dattijo',
    'yo': 'Ìgbìmọ̀ Àgbàgbà',
    'zu': 'Umkhandlu Wabadala',
    'am': 'የሽማግሌዎች ምክር ቤት',
    'ar': 'مجلس الشيوخ',
    'fr': 'Conseil des Anciens'
  },
  'youth_growth': {
    'en': 'Youth Growth Hub',
    'sw': 'Kituo cha Ukuaji wa Vijana',
    'ha': 'Cibiyar Ci Gaban Matasa',
    'yo': 'Àárín Ìdàgbàsókè Àwọn Ọ̀dọ́',
    'zu': 'Isikhungo Sokukhula Kwentsha',
    'am': 'የወጣቶች እድገት ማዕከል',
    'ar': 'مركز نمو الشباب',
    'fr': 'Centre de Croissance des Jeunes'
  },
  'family_care': {
    'en': 'Family Care Center',
    'sw': 'Kituo cha Huduma za Familia',
    'ha': 'Cibiyar Kula da Iyali',
    'yo': 'Àárín Ìtọ́jú Ìdílé',
    'zu': 'Isikhungo Sokunakekela Umndeni',
    'am': 'የቤተሰብ እንክብካቤ ማዕከል',
    'ar': 'مركز رعاية الأسرة',
    'fr': 'Centre de Soins Familiaux'
  },
  'diaspora_bridge': {
    'en': 'Diaspora Bridge',
    'sw': 'Daraja la Diaspora',
    'ha': 'Gadar Diaspora',
    'yo': 'Afárá Diaspora',
    'zu': 'Ibhuloho le-Diaspora',
    'am': 'የዲያስፖራ ድልድይ',
    'ar': 'جسر الشتات',
    'fr': 'Pont de la Diaspora'
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  getLanguagesByRegion: (region: string) => Language[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    AFRICAN_LANGUAGES.find(lang => lang.code === 'en') || AFRICAN_LANGUAGES[0]
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem('clanchain-language');
    if (savedLanguage) {
      const language = AFRICAN_LANGUAGES.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('clanchain-language', language.code);
  };

  const translate = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[currentLanguage.code] || translation['en'] || key;
  };

  const getLanguagesByRegion = (region: string): Language[] => {
    return AFRICAN_LANGUAGES.filter(lang => lang.region === region);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      translate,
      getLanguagesByRegion
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
