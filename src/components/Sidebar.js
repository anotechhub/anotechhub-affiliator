import React from 'react';
import { FileText, Settings } from 'lucide-react';

const Icon = ({ component: Component, className }) => <Component className={className} />;

const Sidebar = ({ currentPage, setCurrentPage, uiText }) => {
    const navItems = [
        { id: 'generator', label: uiText.generator, icon: FileText },
        { id: 'settings', label: uiText.settings, icon: Settings }
    ];

    return (
        <aside className="w-64 p-4 lg:px-6 border-l dark:border-slate-800 border-gray-200/80 hidden lg:flex flex-col gap-2 sticky top-[73px] h-[calc(100vh-121px)]">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${currentPage === item.id
                            ? 'bg-custom-teal-active text-white shadow-md'
                            : 'text-slate-600 dark:text-gray-400 hover:bg-gray-200/60 dark:hover:bg-slate-800/60'
                        }`}
                >
                    <Icon component={item.icon} className="w-5 h-5" />
                    {item.label}
                </button>
            ))}
        </aside>
    );
};

export default Sidebar;