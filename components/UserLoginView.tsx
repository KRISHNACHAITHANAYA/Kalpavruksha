import React, { useState } from 'react';
import { View } from '../types';

interface UserLoginViewProps {
  onLogin: (email: string, password: string) => boolean;
  setView: (view: View) => void;
  t: (key: string) => string;
}

const UserLoginView: React.FC<UserLoginViewProps> = ({ onLogin, setView, t }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(email, password)) {
      setError(t('userLoginError'));
      setPassword('');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">{t('userLoginTitle')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('userLoginEmailLabel')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">{t('userLoginPasswordLabel')}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            {t('userLoginButton')}
          </button>
        </div>
        <div className="text-center text-sm text-gray-400">
          {t('userLoginNoAccount')}{' '}
          <button
            type="button"
            onClick={() => setView(View.USER_SIGNUP)}
            className="font-medium text-green-400 hover:text-green-300"
          >
            {t('userLoginSignUpLink')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserLoginView;
