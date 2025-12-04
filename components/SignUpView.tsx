import React, { useState } from 'react';
import { View } from '../types';

interface SignUpViewProps {
  onSignUp: (name: string, email: string, password: string) => boolean;
  setView: (view: View) => void;
  t: (key: string) => string;
}

const SignUpView: React.FC<SignUpViewProps> = ({ onSignUp, setView, t }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('signUpErrorPasswordMismatch'));
      return;
    }
    if (!onSignUp(name, email, password)) {
      setError(t('signUpErrorGeneral'));
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">{t('signUpTitle')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 glass-card p-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{t('signUpNameLabel')}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('signUpEmailLabel')}</label>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">{t('signUpPasswordLabel')}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">{t('signUpConfirmPasswordLabel')}</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-white/10 border-gray-600 text-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <div className="text-center pt-2">
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            {t('signUpButton')}
          </button>
        </div>
        <div className="text-center text-sm text-gray-400">
          {t('signUpHaveAccount')}{' '}
          <button
            type="button"
            onClick={() => setView(View.USER_LOGIN)}
            className="font-medium text-green-400 hover:text-green-300"
          >
            {t('signUpLoginLink')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpView;
