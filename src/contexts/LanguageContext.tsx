
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
  family?: string;
  script?: string;
  rtl?: boolean;
}

export const AFRICAN_LANGUAGES: Language[] = [
  // East Africa - Cushitic Family
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', region: 'East Africa', flag: '🇰🇪', family: 'Niger-Congo', script: 'Latin' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Ge\'ez' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Latin' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', region: 'East Africa', flag: '🇪🇷', family: 'Afro-Asiatic', script: 'Ge\'ez' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaaliga', region: 'East Africa', flag: '🇸🇴', family: 'Afro-Asiatic', script: 'Latin' },
  { code: 'aa', name: 'Afar', nativeName: 'Qafar af', region: 'East Africa', flag: '🇩🇯', family: 'Afro-Asiatic', script: 'Latin' },
  { code: 'sid', name: 'Sidamo', nativeName: 'Sidaamu afoo', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Latin' },
  { code: 'wal', name: 'Wolaytta', nativeName: 'Wolaytta', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Latin' },
  { code: 'gez', name: 'Ge\'ez', nativeName: 'ግዕዝ', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Ge\'ez' },
  { code: 'gur', name: 'Gurage', nativeName: 'ጉራጌኛ', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Ge\'ez' },

  // West Africa - Niger-Congo Family
  { code: 'ha', name: 'Hausa', nativeName: 'Harshen Hausa', region: 'West Africa', flag: '🇳🇬', family: 'Afro-Asiatic', script: 'Latin' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá', region: 'West Africa', flag: '🇳🇬', family: 'Niger-Congo', script: 'Latin' },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', region: 'West Africa', flag: '🇳🇬', family: 'Niger-Congo', script: 'Latin' },
  { code: 'ff', name: 'Fulfulde', nativeName: 'Fulfulde', region: 'West Africa', flag: '🇸🇳', family: 'Niger-Congo', script: 'Latin' },
  { code: 'wo', name: 'Wolof', nativeName: 'Wollof', region: 'West Africa', flag: '🇸🇳', family: 'Niger-Congo', script: 'Latin' },
  { code: 'tw', name: 'Twi', nativeName: 'Twi', region: 'West Africa', flag: '🇬🇭', family: 'Niger-Congo', script: 'Latin' },
  { code: 'bm', name: 'Bambara', nativeName: 'Bamanankan', region: 'West Africa', flag: '🇲🇱', family: 'Niger-Congo', script: 'Latin' },
  { code: 'man', name: 'Mandinka', nativeName: 'Mandinka', region: 'West Africa', flag: '🇬🇲', family: 'Niger-Congo', script: 'Latin' },
  { code: 'men', name: 'Mende', nativeName: 'Mɛnde yia', region: 'West Africa', flag: '🇸🇱', family: 'Niger-Congo', script: 'Latin' },
  { code: 'tem', name: 'Temne', nativeName: 'Kʌtemnɛ', region: 'West Africa', flag: '🇸🇱', family: 'Niger-Congo', script: 'Latin' },
  { code: 'kri', name: 'Krio', nativeName: 'Krio', region: 'West Africa', flag: '🇸🇱', family: 'Creole', script: 'Latin' },
  { code: 'gom', name: 'Gogo', nativeName: 'Cigogo', region: 'West Africa', flag: '🇹🇿', family: 'Niger-Congo', script: 'Latin' },
  { code: 'ee', name: 'Ewe', nativeName: 'Eʋegbe', region: 'West Africa', flag: '🇬🇭', family: 'Niger-Congo', script: 'Latin' },
  { code: 'gaa', name: 'Ga', nativeName: 'Gã', region: 'West Africa', flag: '🇬🇭', family: 'Niger-Congo', script: 'Latin' },
  { code: 'dag', name: 'Dagbani', nativeName: 'Dagbanli', region: 'West Africa', flag: '🇬🇭', family: 'Niger-Congo', script: 'Latin' },
  { code: 'mos', name: 'Moore', nativeName: 'Mòoré', region: 'West Africa', flag: '🇧🇫', family: 'Niger-Congo', script: 'Latin' },
  { code: 'dyu', name: 'Dyula', nativeName: 'Jula', region: 'West Africa', flag: '🇧🇫', family: 'Niger-Congo', script: 'Latin' },
  { code: 'sus', name: 'Susu', nativeName: 'Sosoxui', region: 'West Africa', flag: '🇬🇳', family: 'Niger-Congo', script: 'Latin' },
  { code: 'kpe', name: 'Kpelle', nativeName: 'Kpɛlɛɛ', region: 'West Africa', flag: '🇱🇷', family: 'Niger-Congo', script: 'Latin' },
  { code: 'vai', name: 'Vai', nativeName: 'ꕙꔤ', region: 'West Africa', flag: '🇱🇷', family: 'Niger-Congo', script: 'Vai' },

  // Southern Africa - Bantu Family
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', region: 'Southern Africa', flag: '🇿🇦', family: 'Niger-Congo', script: 'Latin' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', region: 'Southern Africa', flag: '🇿🇦', family: 'Niger-Congo', script: 'Latin' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', region: 'Southern Africa', flag: '🇿🇦', family: 'Indo-European', script: 'Latin' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho', region: 'Southern Africa', flag: '🇱🇸', family: 'Niger-Congo', script: 'Latin' },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana', region: 'Southern Africa', flag: '🇧🇼', family: 'Niger-Congo', script: 'Latin' },
  { code: 'sn', name: 'Shona', nativeName: 'chiShona', region: 'Southern Africa', flag: '🇿🇼', family: 'Niger-Congo', script: 'Latin' },
  { code: 'nd', name: 'Ndebele', nativeName: 'isiNdebele', region: 'Southern Africa', flag: '🇿🇼', family: 'Niger-Congo', script: 'Latin' },
  { code: 'ss', name: 'Swati', nativeName: 'siSwati', region: 'Southern Africa', flag: '🇸🇿', family: 'Niger-Congo', script: 'Latin' },
  { code: 've', name: 'Venda', nativeName: 'Tshivenḓa', region: 'Southern Africa', flag: '🇿🇦', family: 'Niger-Congo', script: 'Latin' },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga', region: 'Southern Africa', flag: '🇿🇦', family: 'Niger-Congo', script: 'Latin' },
  { code: 'nr', name: 'Ndebele (South)', nativeName: 'isiNdebele', region: 'Southern Africa', flag: '🇿🇦', family: 'Niger-Congo', script: 'Latin' },
  { code: 'nso', name: 'Northern Sotho', nativeName: 'Sesotho sa Leboa', region: 'Southern Africa', flag: '🇿🇦', family: 'Niger-Congo', script: 'Latin' },
  { code: 'ny', name: 'Chewa', nativeName: 'Chichewa', region: 'Southern Africa', flag: '🇲🇼', family: 'Niger-Congo', script: 'Latin' },
  { code: 'bem', name: 'Bemba', nativeName: 'Ichibemba', region: 'Southern Africa', flag: '🇿🇲', family: 'Niger-Congo', script: 'Latin' },
  { code: 'loz', name: 'Lozi', nativeName: 'Silozi', region: 'Southern Africa', flag: '🇿🇲', family: 'Niger-Congo', script: 'Latin' },
  { code: 'lua', name: 'Luba-Lulua', nativeName: 'Tshiluba', region: 'Southern Africa', flag: '🇨🇩', family: 'Niger-Congo', script: 'Latin' },

  // Central Africa - Bantu & Ubangian
  { code: 'ln', name: 'Lingala', nativeName: 'Lingála', region: 'Central Africa', flag: '🇨🇩', family: 'Niger-Congo', script: 'Latin' },
  { code: 'kg', name: 'Kikongo', nativeName: 'Kikongo', region: 'Central Africa', flag: '🇨🇩', family: 'Niger-Congo', script: 'Latin' },
  { code: 'sg', name: 'Sango', nativeName: 'Sängö', region: 'Central Africa', flag: '🇨🇫', family: 'Creole', script: 'Latin' },
  { code: 'lua', name: 'Luba-Kasai', nativeName: 'Tshiluba', region: 'Central Africa', flag: '🇨🇩', family: 'Niger-Congo', script: 'Latin' },
  { code: 'swc', name: 'Congo Swahili', nativeName: 'Kingwana', region: 'Central Africa', flag: '🇨🇩', family: 'Niger-Congo', script: 'Latin' },
  { code: 'tet', name: 'Tetela', nativeName: 'Otetela', region: 'Central Africa', flag: '🇨🇩', family: 'Niger-Congo', script: 'Latin' },
  { code: 'yao', name: 'Yao', nativeName: 'Chiyao', region: 'Central Africa', flag: '🇲🇿', family: 'Niger-Congo', script: 'Latin' },
  { code: 'mak', name: 'Makonde', nativeName: 'Shimakonde', region: 'Central Africa', flag: '🇹🇿', family: 'Niger-Congo', script: 'Latin' },
  { code: 'fan', name: 'Fang', nativeName: 'Fang', region: 'Central Africa', flag: '🇬🇦', family: 'Niger-Congo', script: 'Latin' },
  { code: 'bulu', name: 'Bulu', nativeName: 'Bulu', region: 'Central Africa', flag: '🇨🇲', family: 'Niger-Congo', script: 'Latin' },

  // North Africa - Afro-Asiatic
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'North Africa', flag: '🇪🇬', family: 'Afro-Asiatic', script: 'Arabic', rtl: true },
  { code: 'ber', name: 'Berber/Tamazight', nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', region: 'North Africa', flag: '🇲🇦', family: 'Afro-Asiatic', script: 'Tifinagh' },
  { code: 'kab', name: 'Kabyle', nativeName: 'Taqbaylit', region: 'North Africa', flag: '🇩🇿', family: 'Afro-Asiatic', script: 'Latin' },
  { code: 'shi', name: 'Shilha', nativeName: 'Taclḥiyt', region: 'North Africa', flag: '🇲🇦', family: 'Afro-Asiatic', script: 'Tifinagh' },
  { code: 'rif', name: 'Riffian', nativeName: 'Tarifit', region: 'North Africa', flag: '🇲🇦', family: 'Afro-Asiatic', script: 'Latin' },
  { code: 'tzm', name: 'Central Atlas Tamazight', nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', region: 'North Africa', flag: '🇲🇦', family: 'Afro-Asiatic', script: 'Tifinagh' },

  // Nilo-Saharan Family
  { code: 'din', name: 'Dinka', nativeName: 'Thuɔŋjäŋ', region: 'East Africa', flag: '🇸🇸', family: 'Nilo-Saharan', script: 'Latin' },
  { code: 'nus', name: 'Nuer', nativeName: 'Thok Naath', region: 'East Africa', flag: '🇸🇸', family: 'Nilo-Saharan', script: 'Latin' },
  { code: 'luo', name: 'Luo', nativeName: 'Dholuo', region: 'East Africa', flag: '🇰🇪', family: 'Nilo-Saharan', script: 'Latin' },
  { code: 'ach', name: 'Acholi', nativeName: 'Leb Acholi', region: 'East Africa', flag: '🇺🇬', family: 'Nilo-Saharan', script: 'Latin' },
  { code: 'lgg', name: 'Lugbara', nativeName: 'Lugbara', region: 'East Africa', flag: '🇺🇬', family: 'Nilo-Saharan', script: 'Latin' },
  { code: 'mas', name: 'Maasai', nativeName: 'ɔl Maa', region: 'East Africa', flag: '🇰🇪', family: 'Nilo-Saharan', script: 'Latin' },
  { code: 'suk', name: 'Sukuma', nativeName: 'Kɨsukuma', region: 'East Africa', flag: '🇹🇿', family: 'Niger-Congo', script: 'Latin' },
  { code: 'kam', name: 'Kamba', nativeName: 'Kikamba', region: 'East Africa', flag: '🇰🇪', family: 'Niger-Congo', script: 'Latin' },

  // Khoisan Family (Click Languages)
  { code: 'khi', name: 'Khoekhoe', nativeName: 'Khoekhoegowab', region: 'Southern Africa', flag: '🇳🇦', family: 'Khoisan', script: 'Latin' },
  { code: 'naq', name: 'Nama', nativeName: 'Khoekhoegowab', region: 'Southern Africa', flag: '🇳🇦', family: 'Khoisan', script: 'Latin' },
  { code: 'xam', name: 'ǀXam', nativeName: 'ǀXam', region: 'Southern Africa', flag: '🇿🇦', family: 'Khoisan', script: 'Latin' },

  // Additional West African Languages
  { code: 'ak', name: 'Akan', nativeName: 'Akan', region: 'West Africa', flag: '🇬🇭', family: 'Niger-Congo', script: 'Latin' },
  { code: 'fat', name: 'Fanti', nativeName: 'Mfantse', region: 'West Africa', flag: '🇬🇭', family: 'Niger-Congo', script: 'Latin' },
  { code: 'gur', name: 'Gurma', nativeName: 'Gulmancema', region: 'West Africa', flag: '🇧🇫', family: 'Niger-Congo', script: 'Latin' },
  { code: 'kbp', name: 'Kabiyé', nativeName: 'Kabɩyɛ', region: 'West Africa', flag: '🇹🇬', family: 'Niger-Congo', script: 'Latin' },
  { code: 'bci', name: 'Baoulé', nativeName: 'Baule', region: 'West Africa', flag: '🇨🇮', family: 'Niger-Congo', script: 'Latin' },
  { code: 'bwu', name: 'Buli', nativeName: 'Buli', region: 'West Africa', flag: '🇬🇭', family: 'Niger-Congo', script: 'Latin' },

  // Malagasy (Austronesian in Africa)
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', region: 'East Africa', flag: '🇲🇬', family: 'Austronesian', script: 'Latin' },

  // International Languages
  { code: 'en', name: 'English', nativeName: 'English', region: 'International', flag: '🌍', family: 'Indo-European', script: 'Latin' },
  { code: 'fr', name: 'French', nativeName: 'Français', region: 'International', flag: '🇫🇷', family: 'Indo-European', script: 'Latin' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'International', flag: '🇵🇹', family: 'Indo-European', script: 'Latin' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'International', flag: '🇪🇸', family: 'Indo-European', script: 'Latin' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'International', flag: '🇩🇪', family: 'Indo-European', script: 'Latin' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', region: 'International', flag: '🇮🇹', family: 'Indo-European', script: 'Latin' },

  // Sign Languages
  { code: 'sfs', name: 'South African Sign Language', nativeName: 'SASL', region: 'Southern Africa', flag: '🤟', family: 'Sign Language', script: 'Visual' },
  { code: 'gsg', name: 'Ghana Sign Language', nativeName: 'GSL', region: 'West Africa', flag: '🤟', family: 'Sign Language', script: 'Visual' },
  { code: 'ksl', name: 'Kenyan Sign Language', nativeName: 'KSL', region: 'East Africa', flag: '🤟', family: 'Sign Language', script: 'Visual' },

  // Additional Central African Languages
  { code: 'bnt', name: 'Beti', nativeName: 'Ètì', region: 'Central Africa', flag: '🇨🇲', family: 'Niger-Congo', script: 'Latin' },
  { code: 'yem', name: 'Yemba', nativeName: 'Yemba', region: 'Central Africa', flag: '🇨🇲', family: 'Niger-Congo', script: 'Latin' },
  { code: 'bss', name: 'Akoose', nativeName: 'Bakossi', region: 'Central Africa', flag: '🇨🇲', family: 'Niger-Congo', script: 'Latin' },

  // Additional Ethiopian Languages
  { code: 'gez', name: 'Ge\'ez', nativeName: 'ግዕዝ', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Ge\'ez' },
  { code: 'har', name: 'Harari', nativeName: 'Harari', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Ge\'ez' },
  { code: 'gur', name: 'Gurage', nativeName: 'Gurage', region: 'East Africa', flag: '🇪🇹', family: 'Afro-Asiatic', script: 'Ge\'ez' }
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
    'xh': 'Wamkelekile',
    'af': 'Welkom',
    'st': 'Dumela',
    'tn': 'Dumela',
    'am': 'እንኳን ደህና መጣህ',
    'om': 'Baga nagaan dhuftan',
    'ti': 'ሰላማት መጻእኩም',
    'so': 'Soo dhaweyn',
    'ar': 'أهلاً وسهلاً',
    'fr': 'Bienvenue',
    'pt': 'Bem-vindo',
    'lg': 'Weebale',
    'rw': 'Murakaza neza',
    'mg': 'Tonga soa'
  },
  'clan_dashboard': {
    'en': 'Clan Dashboard',
    'sw': 'Dashibodi ya Ukoo',
    'ha': 'Dashboard na Kabila',
    'yo': 'Dashboard Ìdílé',
    'zu': 'I-Dashboard Yesizwe',
    'xh': 'I-Dashboard Yosapho',
    'af': 'Klan Dashboard',
    'st': 'Dashboard ya Lelapa',
    'tn': 'Dashboard ya Losika',
    'am': 'የቤተሰብ ዳሽቦርድ',
    'om': 'Gabatee Maatii',
    'ti': 'ዳሽቦርድ ቤተሰብ',
    'so': 'Dashboard Qabiil',
    'ar': 'لوحة القبيلة',
    'fr': 'Tableau de Bord du Clan',
    'pt': 'Painel do Clã',
    'mg': 'Tondriky ny Foko'
  },
  'elder_council': {
    'en': 'Elder Council',
    'sw': 'Baraza la Wazee',
    'ha': 'Majalisar Dattijo',
    'yo': 'Ìgbìmọ̀ Àgbàgbà',
    'zu': 'Umkhandlu Wabadala',
    'xh': 'iBhunga lamadoda',
    'af': 'Ouderlingraad',
    'st': 'Lekgotla la Baholo',
    'tn': 'Kgotla ya Bagolo',
    'am': 'የሽማግሌዎች ምክር ቤት',
    'om': 'Mana Jaarsolii',
    'ti': 'ምኽሪ ሽማግለታት',
    'so': 'Golaha Odayaasha',
    'ar': 'مجلس الشيوخ',
    'fr': 'Conseil des Anciens',
    'pt': 'Conselho de Anciãos',
    'mg': 'Filan-kevitry ny Anti-panahy'
  },
  'youth_growth': {
    'en': 'Youth Growth Hub',
    'sw': 'Kituo cha Ukuaji wa Vijana',
    'ha': 'Cibiyar Ci Gaban Matasa',
    'yo': 'Àárín Ìdàgbàsókè Àwọn Ọ̀dọ́',
    'zu': 'Isikhungo Sokukhula Kwentsha',
    'xh': 'Iziko lokuKhula kolulutsha',
    'af': 'Jeug Groei Sentrum',
    'st': 'Setsi sa Kgolo ya Bacha',
    'tn': 'Lefelo la Kgolo ya Basha',
    'am': 'የወጣቶች እድገት ማዕከል',
    'om': 'Buufata Guddina Dargaggoota',
    'ti': 'ማእከል ዕብየት መንእሰያት',
    'so': 'Xarunta Kobaca Dhallinyarada',
    'ar': 'مركز نمو الشباب',
    'fr': 'Centre de Croissance des Jeunes',
    'pt': 'Centro de Crescimento Juvenil',
    'mg': 'Ivon-toeram-pahalalana ho an\'ny tanora'
  },
  'family_care': {
    'en': 'Family Care Center',
    'sw': 'Kituo cha Huduma za Familia',
    'ha': 'Cibiyar Kula da Iyali',
    'yo': 'Àárín Ìtọ́jú Ìdílé',
    'zu': 'Isikhungo Sokunakekela Umndeni',
    'xh': 'Iziko loKhathalelo losapho',
    'af': 'Familie Sorg Sentrum',
    'st': 'Setsi sa Tlhokomelo ya Lelapa',
    'tn': 'Lefelo la Tlhokomelo ya Lelwapa',
    'am': 'የቤተሰብ እንክብካቤ ማዕከል',
    'om': 'Buufata Kunuunsa Maatii',
    'ti': 'ማእከል ሓልዮት ቤተሰብ',
    'so': 'Xarunta Daryeelka Qoyska',
    'ar': 'مركز رعاية الأسرة',
    'fr': 'Centre de Soins Familiaux',
    'pt': 'Centro de Cuidados Familiares',
    'mg': 'Ivon-toeram-pitsaboana ho an\'ny fianakaviana'
  },
  'diaspora_bridge': {
    'en': 'Diaspora Bridge',
    'sw': 'Daraja la Diaspora',
    'ha': 'Gadar Diaspora',
    'yo': 'Afárá Diaspora',
    'zu': 'Ibhuloho le-Diaspora',
    'xh': 'Ibhulorho ye-Diaspora',
    'af': 'Diaspora Brug',
    'st': 'Borokgo ba Diaspora',
    'tn': 'Boroko jwa Diaspora',
    'am': 'የዲያስፖራ ድልድይ',
    'om': 'Riqicha Diyaasporaa',
    'ti': 'ድልድይ ዲያስፖራ',
    'so': 'Buundada Diaspora',
    'ar': 'جسر الشتات',
    'fr': 'Pont de la Diaspora',
    'pt': 'Ponte da Diáspora',
    'mg': 'Tetezana ny Diaspora'
  },
  'oral_tradition_keeper': {
    'en': 'Oral Tradition Keeper',
    'sw': 'Mhifadhi wa Mapokeo ya Mdomo',
    'ha': 'Mai Kiyaye Al\'adar Baki',
    'yo': 'Olùtọ́jú Àṣà Ẹnu',
    'zu': 'Ugcini Wamasiko Omlomo',
    'am': 'የአፍ ወግ ጠባቂ',
    'ar': 'حارس التراث الشفهي',
    'fr': 'Gardien de la Tradition Orale'
  },
  'lunar_calendar_sync': {
    'en': 'Lunar Calendar Sync',
    'sw': 'Usawazishaji wa Kalenda ya Mwezi',
    'ha': 'Haɗin Kalandar Wata',
    'yo': 'Ìbámu Kàlẹ́ndà Òṣùpá',
    'zu': 'Ukuhlanganisa Kwekalenda Yenyanga',
    'am': 'የጨረቃ ቀን መቁጠሪያ ማመሳከሪያ',
    'ar': 'مزامنة التقويم القمري',
    'fr': 'Synchronisation Calendrier Lunaire'
  },
  'ancestral_tree_navigator': {
    'en': 'Ancestral Tree Navigator',
    'sw': 'Mwongozo wa Mti wa Babu',
    'ha': 'Mai Jagoran Bishiyar Kakanni',
    'yo': 'Atọ́nà Igi Ìran',
    'zu': 'Umkhombi Wesihlahla Sokhokho',
    'am': 'የቅድመ አያቶች ዛፍ መምሪያ',
    'ar': 'متصفح شجرة الأجداد',
    'fr': 'Navigateur Arbre Ancestral'
  },
  'ubuntu_consensus_engine': {
    'en': 'Ubuntu Consensus Engine',
    'sw': 'Injini ya Makubaliano ya Ubuntu',
    'ha': 'Injin Yarjejeniya ta Ubuntu',
    'yo': 'Ẹ̀rọ Ìfọkànsí Ubuntu',
    'zu': 'Injini Yokuvumelana ye-Ubuntu',
    'am': 'የኡቡንቱ ስምምነት ሞተር',
    'ar': 'محرك إجماع أوبونتو',
    'fr': 'Moteur de Consensus Ubuntu'
  },
  'ritual_rhythm_tracker': {
    'en': 'Ritual Rhythm Tracker',
    'sw': 'Kifuatilia cha Mizani ya Ibada',
    'ha': 'Mai Bin Bugun Gudanar Ibada',
    'yo': 'Atọ́pà Ìlù Ìṣe',
    'zu': 'Umlandeli Wesingqi Samasiko',
    'am': 'የአምልኮ ሪትም መከታተያ',
    'ar': 'متتبع إيقاع الطقوس',
    'fr': 'Traceur de Rythme Rituel'
  },
  'sacred_geography_mapper': {
    'en': 'Sacred Geography Mapper',
    'sw': 'Mchora Ramani wa Mahali Matakatifu',
    'ha': 'Mai Zanen Wuraren Tsarkaka',
    'yo': 'Atọ́nà Ìlẹ̀ Mímọ́',
    'zu': 'Umfaki Wezindawo Ezingcwele',
    'am': 'የቅዱስ ጂኦግራፊ ካርታ አውጪ',
    'ar': 'راسم الجغرافيا المقدسة',
    'fr': 'Cartographe de Géographie Sacrée'
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  getLanguagesByRegion: (region: string) => Language[];
  getLanguagesByFamily: (family: string) => Language[];
  detectLanguage: () => Language;
  getSimilarLanguages: (language: Language) => Language[];
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
    } else {
      // Auto-detect language from browser
      const detected = detectLanguage();
      setCurrentLanguage(detected);
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('clanchain-language', language.code);
    
    // Update document direction for RTL languages
    if (language.rtl) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = language.code;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language.code;
    }
  };

  const translate = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    
    // Try current language first
    if (translation[currentLanguage.code]) {
      return translation[currentLanguage.code];
    }
    
    // Fallback to similar languages in same family
    const similarLangs = getSimilarLanguages(currentLanguage);
    for (const lang of similarLangs) {
      if (translation[lang.code]) {
        return translation[lang.code];
      }
    }
    
    // Final fallback to English
    return translation['en'] || key;
  };

  const getLanguagesByRegion = (region: string): Language[] => {
    return AFRICAN_LANGUAGES.filter(lang => lang.region === region);
  };

  const getLanguagesByFamily = (family: string): Language[] => {
    return AFRICAN_LANGUAGES.filter(lang => lang.family === family);
  };

  const detectLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    const detected = AFRICAN_LANGUAGES.find(lang => lang.code === browserLang);
    return detected || AFRICAN_LANGUAGES.find(lang => lang.code === 'en') || AFRICAN_LANGUAGES[0];
  };

  const getSimilarLanguages = (language: Language): Language[] => {
    return AFRICAN_LANGUAGES.filter(lang => 
      lang.family === language.family && 
      lang.region === language.region && 
      lang.code !== language.code
    );
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      translate,
      getLanguagesByRegion,
      getLanguagesByFamily,
      detectLanguage,
      getSimilarLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
