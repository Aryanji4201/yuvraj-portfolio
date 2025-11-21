import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations } from '../translations';
import type { LanguageCode } from '../types';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  languageFullName: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageMap: { [key in LanguageCode]: string } = {
    en: 'English',
    hi: 'Hindi',
    bn: 'Bengali',
    te: 'Telugu',
    mr: 'Marathi',
    ta: 'Tamil',
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('selectedLanguageCode') as LanguageCode) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('selectedLanguageCode', language);
    localStorage.setItem('selectedLanguage', languageMap[language]);
  }, [language]);

  const setLanguage = (langCode: LanguageCode) => {
    setLanguageState(langCode);
  };

  const t = (key: string, replacements?: { [key: string]: string | number }): string => {
    const langTranslations = translations[language] || translations.en;
    let text = langTranslations[key] || key;

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        text = text.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }
    
    return text;
  };

  const languageFullName = languageMap[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageFullName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};