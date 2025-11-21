import React, { useState, useEffect, useCallback } from 'react';
import { generateMcqTest } from '../services/geminiService';
import type { UserProfile, MCQ } from '../types';
import Spinner from './common/Spinner';
import { useLanguage } from '../context/LanguageContext';

interface AssessmentTestProps {
  profile: UserProfile;
  onTestComplete: () => void;
}

export const AssessmentTest: React.FC<AssessmentTestProps> = ({ profile, onTestComplete }) => {
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const { t, languageFullName } = useLanguage();

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const generatedQuestions = await generateMcqTest(profile.studentClass, profile.weakSubjects, languageFullName);
      setQuestions(generatedQuestions);
      setAnswers(new Array(generatedQuestions.length).fill(null));
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [profile.studentClass, profile.weakSubjects, languageFullName]);

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswerSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
    }
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };
  
  const handleFinish = () => {
    localStorage.setItem('assessmentComplete', 'true');
    onTestComplete();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
        <Spinner size="lg" />
        <h2 className="text-2xl font-semibold text-gray-700 mt-6">{t('assessment_generating_title')}</h2>
        <p className="text-gray-500 mt-2">{t('assessment_generating_prompt')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-4">
        <h2 className="text-2xl font-semibold text-red-700">{t('assessment_error_title')}</h2>
        <p className="text-red-600 mt-2">{error}</p>
        <button onClick={fetchQuestions} className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
          {t('assessment_try_again_button')}
        </button>
      </div>
    );
  }

  if (score !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-200 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{t('assessment_complete_title')}</h2>
          <p className="text-gray-600">{t('assessment_complete_prompt')}</p>
          <div className="py-4">
            <p className="text-lg font-medium text-gray-700">{t('assessment_your_score')}</p>
            <p className="text-5xl font-bold text-green-600">{score} <span className="text-3xl text-gray-500">/ {questions.length}</span></p>
          </div>
          <button onClick={handleFinish} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
            {t('assessment_start_learning_button')}
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
              <p>No questions available.</p>
          </div>
      )
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <p className="text-sm font-medium text-blue-600">{t('assessment_question_of', { current: currentQuestionIndex + 1, total: questions.length })}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 pt-4">{currentQuestion.question}</h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all text-gray-700 ${answers[currentQuestionIndex] === option ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
            >
              {option}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestionIndex]}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
        >
          {currentQuestionIndex < questions.length - 1 ? t('assessment_next_button') : t('assessment_finish_button')}
        </button>
      </div>
    </div>
  );
};