import React, { createContext, useContext, useState } from 'react';
import { Language, Translations } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड' },
  'nav.quiz': { en: 'Quiz', hi: 'क्विज़' },
  'nav.colleges': { en: 'Colleges', hi: 'कॉलेज' },
  'nav.timeline': { en: 'Timeline', hi: 'समयसारणी' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफाइल' },
  
  // Authentication
  'auth.login': { en: 'Login', hi: 'लॉगिन' },
  'auth.register': { en: 'Register', hi: 'पंजीकरण' },
  'auth.email': { en: 'Email', hi: 'ईमेल' },
  'auth.password': { en: 'Password', hi: 'पासवर्ड' },
  'auth.name': { en: 'Full Name', hi: 'पूरा नाम' },
  
  // Profile
  'profile.class': { en: 'Class', hi: 'कक्षा' },
  'profile.board': { en: 'Board', hi: 'बोर्ड' },
  'profile.district': { en: 'District', hi: 'जिला' },
  'profile.interests': { en: 'Interests', hi: 'रुचियाँ' },
  
  // Quiz
  'quiz.title': { en: 'Aptitude & Interest Assessment', hi: 'योग्यता और रुचि मूल्यांकन' },
  'quiz.start': { en: 'Start Quiz', hi: 'क्विज़ शुरू करें' },
  'quiz.next': { en: 'Next', hi: 'अगला' },
  'quiz.submit': { en: 'Submit', hi: 'जमा करें' },
  
  // Results
  'results.recommendations': { en: 'Recommendations', hi: 'सिफारिशें' },
  'results.streams': { en: 'Recommended Streams', hi: 'सुझाए गए स्ट्रीम' },
  'results.courses': { en: 'Courses', hi: 'कोर्स' },
  'results.careers': { en: 'Career Paths', hi: 'करियर पथ' },
  
  // Common
  'common.save': { en: 'Save', hi: 'सेव करें' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.error': { en: 'Error', hi: 'त्रुटि' },
  'common.success': { en: 'Success', hi: 'सफलता' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}