// src/components/Header.js

import React from 'react';
import { Bot, Coffee, Sun, Moon, User } from 'lucide-react';

const Header = ({ theme, setTheme, language, setLanguage, uiText, onLogoClick, onUserClick }) => (
    <header className="flex items-center justify-between p-4 border-b dark:border-slate-800 border-gray-200/80 sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg z-10">
        <button onClick={onLogoClick} className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-custom-teal" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                AnoTechHub <span className="hidden sm:inline">Script Affiliate Generator</span>
            </h1>
        </button>
        <div className="flex items-center gap-4">
            <button onClick={() => setLanguage(language === 'en' ? 'id' : 'en')} className="font-semibold text-sm p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <span className={language === 'en' ? 'text-custom-teal' : ''}>EN</span> / <span className={language === 'id' ? 'text-custom-teal' : ''}>ID</span>
            </button>
            <a href="http://lynk.id/trianonurhikmat/s/re0nnxqyd36k" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-custom-teal dark:hover:text-custom-teal-light transition-colors">
                <Coffee className="w-5 h-5" /><span className="hidden sm:inline">{uiText.supportAdmin}</span>
            </a>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                {theme === 'light' ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>
            {/* User icon for mobile sidebar toggle */}
            <button onClick={onUserClick} className="lg:hidden w-9 h-9 bg-custom-teal rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
            </button>
            {/* Static user icon for desktop */}
            <div className="hidden lg:flex w-9 h-9 bg-custom-teal rounded-full items-center justify-center">
                <User className="w-5 h-5 text-white" />
            </div>
        </div>
    </header>
);

export default Header;