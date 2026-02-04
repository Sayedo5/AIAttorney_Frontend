import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Language = 'EN' | 'UR';

interface Translations {
  [key: string]: {
    EN: string;
    UR: string;
  };
}

// UI Translations
export const translations: Translations = {
  // Common
  search: { EN: 'Search', UR: 'تلاش' },
  cancel: { EN: 'Cancel', UR: 'منسوخ' },
  save: { EN: 'Save', UR: 'محفوظ کریں' },
  back: { EN: 'Back', UR: 'واپس' },
  next: { EN: 'Next', UR: 'اگلا' },
  previous: { EN: 'Previous', UR: 'پچھلا' },
  viewAll: { EN: 'View all', UR: 'سب دیکھیں' },
  loading: { EN: 'Loading...', UR: 'لوڈ ہو رہا ہے...' },
  
  // Home Screen
  goodMorning: { EN: 'Good morning', UR: 'صبح بخیر' },
  goodAfternoon: { EN: 'Good afternoon', UR: 'دوپہر بخیر' },
  goodEvening: { EN: 'Good evening', UR: 'شام بخیر' },
  askAIAttorney: { EN: 'Ask AI Attorney...', UR: 'اے آئی وکیل سے پوچھیں...' },
  quickActions: { EN: 'Quick Actions', UR: 'فوری کارروائیاں' },
  tryAsking: { EN: 'Try asking', UR: 'پوچھنے کی کوشش کریں' },
  recentActivity: { EN: 'Recent Activity', UR: 'حالیہ سرگرمی' },
  
  // Quick Actions
  newChat: { EN: 'New Chat', UR: 'نئی گفتگو' },
  startLegalConversation: { EN: 'Start a legal conversation', UR: 'قانونی بات چیت شروع کریں' },
  draftDocs: { EN: 'Draft Docs', UR: 'دستاویزات' },
  createLegalDocuments: { EN: 'Create legal documents', UR: 'قانونی دستاویزات بنائیں' },
  caseResearch: { EN: 'Case Research', UR: 'کیس ریسرچ' },
  searchCaseLaw: { EN: 'Search case law', UR: 'کیس لاء تلاش کریں' },
  casesDiary: { EN: 'Cases Diary', UR: 'کیسز ڈائری' },
  manageYourCases: { EN: 'Manage your cases', UR: 'اپنے کیسز کا انتظام کریں' },
  
  // Suggestions
  suggestion1: { EN: 'How to file a civil suit in Pakistan?', UR: 'پاکستان میں دیوانی مقدمہ کیسے دائر کریں؟' },
  suggestion2: { EN: 'What are tenant rights under Rent Act?', UR: 'کرایہ ایکٹ کے تحت کرایہ دار کے حقوق کیا ہیں؟' },
  suggestion3: { EN: 'Draft a rental agreement', UR: 'کرایہ نامہ تیار کریں' },
  suggestion4: { EN: 'Explain Section 420 PPC', UR: 'دفعہ 420 پی پی سی کی وضاحت کریں' },
  
  // Chat Screen
  aiAttorney: { EN: 'AI Attorney', UR: 'اے آئی وکیل' },
  welcomeToAIAttorney: { EN: 'Welcome to AI Attorney', UR: 'اے آئی وکیل میں خوش آمدید' },
  poweredByAI: { EN: 'Powered by Latest AI Technology', UR: 'جدید اے آئی ٹیکنالوجی سے چلتا ہے' },
  startTyping: { EN: 'Start by typing your message or upload a document', UR: 'اپنا پیغام ٹائپ کریں یا دستاویز اپلوڈ کریں' },
  quickPrompts: { EN: 'Quick prompts', UR: 'فوری سوالات' },
  listening: { EN: 'Listening...', UR: 'سن رہا ہے...' },
  disclaimer: { EN: 'Authentic citations. Verify applicability. Avoid web searches for Pakistani cases.', UR: 'مستند حوالہ جات۔ اطلاق کی تصدیق کریں۔ پاکستانی مقدمات کے لیے ویب سرچ سے گریز کریں۔' },
  
  // Chat Prompts
  prompt1: { EN: 'Explain the legal implications of starting an e-commerce business', UR: 'ای کامرس کاروبار شروع کرنے کے قانونی مضمرات کی وضاحت کریں' },
  prompt2: { EN: 'What regulations do I need to comply with?', UR: 'مجھے کن ضوابط کی پابندی کرنی ہوگی؟' },
  prompt3: { EN: 'Draft a basic rental agreement', UR: 'بنیادی کرایہ نامہ تیار کریں' },
  
  // Documents Screen (for nav, use short form)
  documentsNav: { EN: 'Docs', UR: 'دستاویزات' },
  documents: { EN: 'Documents', UR: 'دستاویزات' },
  cases: { EN: 'Cases', UR: 'کیسز' },
  draft: { EN: 'Draft', UR: 'مسودہ' },
  createNewDocument: { EN: 'Create new document', UR: 'نئی دستاویز بنائیں' },
  review: { EN: 'Review', UR: 'جائزہ' },
  analyzeDocument: { EN: 'Analyze document', UR: 'دستاویز کا تجزیہ' },
  upload: { EN: 'Upload', UR: 'اپلوڈ' },
  importFile: { EN: 'Import file', UR: 'فائل درآمد کریں' },
  searchDocuments: { EN: 'Search documents...', UR: 'دستاویزات تلاش کریں...' },
  recentDocuments: { EN: 'Recent Documents', UR: 'حالیہ دستاویزات' },
  recentlyUploaded: { EN: 'Recently Uploaded', UR: 'حال ہی میں اپلوڈ' },
  all: { EN: 'All', UR: 'سب' },
  drafts: { EN: 'Drafts', UR: 'مسودے' },
  reviewed: { EN: 'Reviewed', UR: 'جائزہ شدہ' },
  templates: { EN: 'Templates', UR: 'ٹیمپلیٹس' },
  
  // Library Screen
  legalLibrary: { EN: 'Legal Library', UR: 'قانونی لائبریری' },
  searchCasesStatutes: { EN: 'Search cases, statutes...', UR: 'کیسز، قوانین تلاش کریں...' },
  bookmarks: { EN: 'Bookmarks', UR: 'بک مارکس' },
  savedCases: { EN: 'Saved Cases', UR: 'محفوظ کیسز' },
  savedStatutes: { EN: 'Saved Statutes', UR: 'محفوظ قوانین' },
  acts: { EN: 'Acts', UR: 'ایکٹس' },
  codes: { EN: 'Codes', UR: 'کوڈز' },
  libraryStatistics: { EN: 'Library Statistics', UR: 'لائبریری کے اعداد و شمار' },
  
  // Files
  filesAttached: { EN: 'file(s) attached', UR: 'فائل(یں) منسلک' },
  removeAll: { EN: 'Remove all', UR: 'سب ہٹائیں' },
  fileAdded: { EN: 'File Added', UR: 'فائل شامل' },
  filesUploaded: { EN: 'Files Uploaded', UR: 'فائلیں اپلوڈ' },
  
  // Voice
  voiceError: { EN: 'Voice Error', UR: 'آواز میں خرابی' },
  allowMicrophone: { EN: 'Please allow microphone access', UR: 'براہ کرم مائیکروفون کی اجازت دیں' },
  voiceRecordingFailed: { EN: 'Voice recording failed', UR: 'آواز ریکارڈنگ ناکام' },
  notSupported: { EN: 'Not Supported', UR: 'معاونت نہیں' },
  voiceNotSupported: { EN: 'Voice recording is not supported in this browser', UR: 'اس براؤزر میں آواز ریکارڈنگ کی سہولت نہیں ہے' },
  
  // Settings
  settings: { EN: 'Settings', UR: 'ترتیبات' },
  profile: { EN: 'Profile', UR: 'پروفائل' },
  notifications: { EN: 'Notifications', UR: 'اطلاعات' },
  appearance: { EN: 'Appearance', UR: 'ظاہری شکل' },
  language: { EN: 'Language', UR: 'زبان' },
  logout: { EN: 'Logout', UR: 'لاگ آؤٹ' },
  
  // Navigation
  home: { EN: 'Home', UR: 'ہوم' },
  chat: { EN: 'Chat', UR: 'چیٹ' },
  library: { EN: 'Library', UR: 'لائبریری' },
  more: { EN: 'More', UR: 'مزید' },
};

// AI Response translations
export const aiResponses = {
  EN: [
    "Based on Pakistani law, I can help you understand this legal matter. The relevant provisions under the Contract Act 1872 state that...",
    "According to the precedent set in PLD 2020 SC 456, the Supreme Court held that...",
    "For your query regarding property law in Pakistan, Section 54 of the Transfer of Property Act applies here...",
    "The procedure for filing a civil suit involves several steps. First, you need to file a plaint under Order VII of CPC...",
  ],
  UR: [
    "پاکستانی قانون کی بنیاد پر، میں اس قانونی معاملے کو سمجھنے میں آپ کی مدد کر سکتا ہوں۔ معاہدہ ایکٹ 1872 کے متعلقہ دفعات کہتے ہیں کہ...",
    "PLD 2020 SC 456 میں قائم نظیر کے مطابق، سپریم کورٹ نے فیصلہ دیا کہ...",
    "پاکستان میں جائیداد کے قانون سے متعلق آپ کے سوال کے لیے، ٹرانسفر آف پراپرٹی ایکٹ کی دفعہ 54 یہاں لاگو ہوتی ہے...",
    "دیوانی مقدمہ دائر کرنے کا طریقہ کار کئی مراحل پر مشتمل ہے۔ پہلے، آپ کو CPC کے آرڈر VII کے تحت درخواست دائر کرنی ہوگی...",
  ],
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  getAIResponse: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('EN');

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  }, [language]);

  const getAIResponse = useCallback((): string => {
    const responses = aiResponses[language];
    return responses[Math.floor(Math.random() * responses.length)];
  }, [language]);

  const isRTL = language === 'UR';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, getAIResponse }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
