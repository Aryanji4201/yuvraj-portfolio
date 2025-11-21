import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock API call
    setTimeout(() => {
      if (isLogin) {
        if (email && password) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          onLoginSuccess();
        } else {
          setError(t('auth_fill_fields_error'));
        }
      } else {
        if (password !== confirmPassword) {
          setError(t('auth_password_mismatch_error'));
        } else if (email && password) {
          // Simulate successful signup and auto-login
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          onLoginSuccess();
        } else {
          setError(t('auth_fill_fields_error'));
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 transform transition-all hover:scale-105 duration-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{t('welcome_title')}</h1>
          <p className="text-gray-500 mt-2">{isLogin ? t('auth_signin_prompt') : t('auth_signup_prompt')}</p>
        </div>
        
        <div className="flex justify-center border border-gray-200 rounded-full p-1">
          <button onClick={() => setIsLogin(true)} className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isLogin ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600'}`}>{t('auth_student_login')}</button>
          <button onClick={() => setIsLogin(false)} className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${!isLogin ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600'}`}>{t('auth_signup')}</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t('auth_email_placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <input
            type="password"
            placeholder={t('auth_password_placeholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder={t('auth_confirm_password_placeholder')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-300 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isLogin ? t('auth_login_button') : t('auth_signup_button')
            )}
          </button>
        </form>
         <p className="text-center text-xs text-gray-500">{t('auth_admin_disabled')}</p>
      </div>
    </div>
  );
};