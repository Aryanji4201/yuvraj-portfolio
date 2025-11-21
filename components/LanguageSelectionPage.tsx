import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { LanguageCode } from '../types';

interface LanguageSelectionPageProps {
  onLanguageSelected: () => void;
}

const languages: { code: LanguageCode; name: string; native: string }[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
];

export const LanguageSelectionPage: React.FC<LanguageSelectionPageProps> = ({ onLanguageSelected }) => {
  const { setLanguage, t } = useLanguage();

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    onLanguageSelected();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-cyan-200 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">{t('language_selection_title')}</h1>
        <p className="text-gray-500">{t('language_selection_prompt')}</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="block text-lg font-semibold text-gray-700">{lang.name}</span>
              <span className="block text-md text-gray-500">{lang.native}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};