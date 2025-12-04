import React, { useState } from 'react';

interface AdminLoginViewProps {
  onLogin: (password: string) => boolean;
  t: (key: string) => string;
}

const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLogin, t }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError(t('adminLoginError'));
      setPassword('');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">{t('adminLoginTitle')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">{t('adminLoginPasswordLabel')}</label>
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
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            {t('adminLoginButton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginView;
