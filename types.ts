export type LanguageCode = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta';

export enum AppView {
  AUTH,
  LANGUAGE_SELECTION,
  ONBOARDING,
  ASSESSMENT,
  DASHBOARD,
}

export interface UserProfile {
  name: string;
  age: number;
  studentClass: number;
  email: string;
  phone: string;
  interests: string[];
  weakSubjects: string[];
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Chapter {
  id: string;
  title: string;
  hasVideo: boolean;
  hasNotes: boolean;
  hasTest: boolean;
}

export interface Subject {
  id: string;
  name: string;
  icon: 'BookOpen' | 'Beaker' | 'Calculator' | 'Globe' | 'Scale';
  chapters: Chapter[];
}