import React from 'react';
import { Bot, Coffee, Sun, Moon, User } from 'lucide-react';

const Header = ({ theme, setTheme }) => (
    <header className="flex items-center justify-between p-4 border-b dark:border-slate-800 border-gray-200/80 sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg z-10">
        <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-custom-teal" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                AnoTechHub <span className="hidden sm:inline">Script Affiliate Generator</span>
            </h1>
        </div>
        <div className="flex items-center gap-4">
            <a href="http://lynk.id/trianonurhikmat/s/re0nnxqyd36k" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-custom-teal dark:hover:text-custom-teal-light transition-colors">
                <Coffee className="w-5 h-5" /><span className="hidden sm:inline">Support Admin</span>
            </a>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                {theme === 'light' ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>
            <div className="w-9 h-9 bg-custom-teal rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
            </div>
        </div>
    </header>
);

export default Header;