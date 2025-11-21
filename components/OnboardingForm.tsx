import React, { useState, useMemo } from 'react';
import type { UserProfile } from '../types';
import { ALL_SUBJECTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

interface OnboardingFormProps {
  onOnboardingComplete: (profile: UserProfile) => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onOnboardingComplete }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [studentClass, setStudentClass] = useState<number | ''>('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { t } = useLanguage();
  const email = localStorage.getItem('userEmail') || 'student@example.com';

  const availableSubjects = useMemo(() => {
    return studentClass ? ALL_SUBJECTS[studentClass] || [] : [];
  }, [studentClass]);
  
  const handleInterestToggle = (interest: string) => {
    setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };
  
  const handleSubjectToggle = (subject: string) => {
    setWeakSubjects(prev => prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !studentClass || !phone) {
        alert("Please fill all required fields.");
        return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const profile: UserProfile = { name, age: Number(age), studentClass: Number(studentClass), email, phone, interests, weakSubjects: weakSubjects.length > 0 ? weakSubjects : [availableSubjects[0]] };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      onOnboardingComplete(profile);
      setLoading(false);
    }, 1000);
  };
  
  const popularInterests = ["Reading", "Sports", "Music", "Art", "Farming", "Technology"];
  const getSubjectTranslationKey = (subject: string) => `subject_${subject.toLowerCase().replace(/ /g, '_')}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">{t('onboarding_title')}</h1>
        <p className="text-center text-gray-500">{t('onboarding_prompt')}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700">{t('onboarding_fullname')}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">{t('onboarding_email')}</label>
              <input type="email" value={email} disabled className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">{t('onboarding_age')}</label>
              <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} required className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">{t('onboarding_class')}</label>
              <select value={studentClass} onChange={e => setStudentClass(Number(e.target.value))} required className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option value="">{t('onboarding_select_class')}</option>
                {[...Array(9)].map((_, i) => <option key={i+2} value={i+2}>{i+2}</option>)}
              </select>
            </div>
             <div>
              <label className="font-semibold text-gray-700">{t('onboarding_phone')}</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          
          <div>
            <label className="font-semibold text-gray-700">{t('onboarding_interests')}</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {popularInterests.map(interest => (
                <button type="button" key={interest} onClick={() => handleInterestToggle(interest)} className={`px-3 py-1 text-sm rounded-full transition-colors ${interests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {interest}
                </button>
              ))}
            </div>
          </div>
          
          {studentClass && (
            <div>
              <label className="font-semibold text-gray-700">{t('onboarding_weak_subjects')}</label>
              <p className="text-xs text-gray-500">{t('onboarding_weak_subjects_prompt')}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableSubjects.map(subject => (
                  <button type="button" key={subject} onClick={() => handleSubjectToggle(subject)} className={`px-3 py-1 text-sm rounded-full transition-colors ${weakSubjects.includes(subject) ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {t(getSubjectTranslationKey(subject))}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex justify-center items-center">
             {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : t('onboarding_continue_button')}
          </button>
        </form>
      </div>
    </div>
  );
};