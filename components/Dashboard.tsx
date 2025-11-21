import React, { useState } from 'react';
import type { UserProfile, Subject as SubjectType, Chapter } from '../types';
import { SUBJECT_DATA } from '../constants';
import { BeakerIcon, BookOpenIcon, CalculatorIcon, GlobeIcon, ScaleIcon } from './common/Icons';
import { generateChapterNotes } from '../services/geminiService';
import Spinner from './common/Spinner';
import { useLanguage } from '../context/LanguageContext';

interface DashboardProps {
  profile: UserProfile;
  onLogout: () => void;
}

const iconMap = {
  BookOpen: BookOpenIcon,
  Beaker: BeakerIcon,
  Calculator: CalculatorIcon,
  Globe: GlobeIcon,
  Scale: ScaleIcon,
};

const SubjectCard: React.FC<{ subject: SubjectType; onSelect: () => void }> = ({ subject, onSelect }) => {
  const IconComponent = iconMap[subject.icon];
  const { t } = useLanguage();
  return (
    <div onClick={onSelect} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center space-y-3">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <IconComponent className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
      <p className="text-sm text-gray-500">{subject.chapters.length} {t('dashboard_chapters')}</p>
    </div>
  );
};

const ChapterView: React.FC<{ subject: SubjectType; profile: UserProfile; onBack: () => void }> = ({ subject, profile, onBack }) => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [errorNotes, setErrorNotes] = useState<string|null>(null);
  const { t, languageFullName } = useLanguage();

  const handleGetNotes = async (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setLoadingNotes(true);
    setErrorNotes(null);
    setNotes('');
    try {
      const generatedNotes = await generateChapterNotes(profile.studentClass, subject.name, chapter.title, languageFullName);
      setNotes(generatedNotes);
    } catch(e: any) {
      setErrorNotes(e.message || 'Failed to load notes.');
    } finally {
      setLoadingNotes(false);
    }
  }

  const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    return (
        <div className="prose prose-sm max-w-none">
            {lines.map((line, index) => {
                if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-semibold mt-2">{line.substring(4)}</h3>
                if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-bold mt-4">{line.substring(3)}</h2>
                if (line.startsWith('# ')) return <h1 key={index} className="text-2xl font-bold mt-6">{line.substring(2)}</h1>
                if (line.startsWith('* ')) return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>
                if (line.trim() === '') return <br key={index} />
                return <p key={index}>{line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
            })}
        </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <button onClick={onBack} className="mb-6 text-blue-600 font-semibold hover:underline">{t('dashboard_back_to_subjects')}</button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{subject.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{t('dashboard_chapters')}</h3>
          {subject.chapters.map(chapter => (
            <div key={chapter.id} className={`p-4 rounded-lg transition-colors ${selectedChapter?.id === chapter.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <h4 className="font-semibold text-gray-800">{chapter.title}</h4>
              <div className="flex gap-4 mt-2 text-sm">
                <button className="text-blue-600 hover:underline">{t('dashboard_resource_video')}</button>
                <button onClick={() => handleGetNotes(chapter)} className="text-green-600 hover:underline">{t('dashboard_resource_notes')}</button>
                <button className="text-red-600 hover:underline">{t('dashboard_resource_test')}</button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4">{t('dashboard_study_notes')}</h3>
          {loadingNotes && <div className="flex flex-col items-center justify-center h-48"><Spinner /><p className="mt-2 text-sm text-gray-500">{t('dashboard_notes_generating')}</p></div>}
          {errorNotes && <p className="text-red-500">{errorNotes}</p>}
          {notes && !loadingNotes && <MarkdownRenderer content={notes} />}
          {!notes && !loadingNotes && !errorNotes && <p className="text-gray-500">{t('dashboard_notes_prompt')}</p>}
        </div>
      </div>
    </div>
  )
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, onLogout }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | null>(null);
  const { t } = useLanguage();
  
  const subjectsToShow = SUBJECT_DATA.filter(s => {
    const studentSubjects = profile.weakSubjects.concat(profile.interests); // simplified logic
    return studentSubjects.some(ss => s.name.toLowerCase().includes(ss.toLowerCase()));
  });

  if (selectedSubject) {
    return <ChapterView subject={selectedSubject} profile={profile} onBack={() => setSelectedSubject(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t('dashboard_greeting', { name: profile.name })}</h1>
          <p className="text-gray-500">{t('dashboard_prompt')}</p>
        </div>
        <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors text-sm">{t('dashboard_logout')}</button>
      </header>
      
      <main className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t('dashboard_your_subjects')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SUBJECT_DATA.map(subject => (
            <SubjectCard key={subject.id} subject={subject} onSelect={() => setSelectedSubject(subject)} />
          ))}
        </div>
      </main>
    </div>
  );
};