import React, { useState } from 'react';
import { View, Language } from '../types';
import {
  ChevronDownIcon,
  InformationCircleIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isUserAuthenticated: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ setView, language, setLanguage, t, isUserAuthenticated, handleLogout, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { view: View.HOME, label: t('navHome'), icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    { view: View.EXPERT_FINDER, label: t('navFindExpert'), icon: <UserCircleIcon className="w-5 h-5" /> },
    { view: View.ABOUT, label: t('navAbout'), icon: <InformationCircleIcon className="w-5 h-5" /> },
    { view: View.CONTACT, label: t('navContact'), icon: <PhoneIcon className="w-5 h-5" /> },
    { view: View.ADMIN_LOGIN, label: t('navAdmin'), icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];

  const languageOptions = [
    { code: Language.ENGLISH, name: 'English' },
    { code: Language.KANNADA, name: 'ಕನ್ನಡ' },
    { code: Language.TAMIL, name: 'தமிழ்' },
    { code: Language.TELUGU, name: 'తెలుగు' },
    { code: Language.MALAYALAM, name: 'മലയാളം' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800/50 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView(View.GET_STARTED)}>
          <img src="/assets/logo.webp" alt="Kalpavruksha Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-bold text-white">{t('appTitle')}</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {isUserAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              <span className="font-medium">{t('navLogout')}</span>
            </button>
          ) : (
            <button
              onClick={() => setView(View.USER_LOGIN)}
              className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <UserCircleIcon className="w-6 h-6" />
              <span className="font-medium">{t('navLogin')}</span>
            </button>
          )}

          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-gray-700 text-white rounded-md py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {languageOptions.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            {isUserAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => setView(View.USER_LOGIN)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <UserCircleIcon className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 text-gray-300 hover:text-white"
              aria-label="Open menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setView(item.view);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 p-2 text-gray-300 hover:bg-gray-700 rounded-md"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;