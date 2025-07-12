// src/components/Sidebar.js

import React from 'react';
import { FileText, Settings, X } from 'lucide-react';

const Icon = ({ component: Component, className }) => <Component className={className} />;

const Sidebar = ({ currentPage, setCurrentPage, uiText, isOpen, onClose }) => {
    const navItems = [
        { id: 'generator', label: uiText.generator, icon: FileText },
        { id: 'settings', label: uiText.settings, icon: Settings },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={onClose}
            ></div>
            
            <aside className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg p-4 transition-transform z-30 lg:sticky lg:top-[73px] lg:h-[calc(100vh-121px)] lg:w-64 lg:shadow-none lg:bg-transparent lg:dark:bg-transparent lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="lg:hidden flex justify-end mb-4">
                    <button onClick={onClose}><X className="w-6 h-6"/></button>
                </div>
                <div className="flex flex-col gap-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setCurrentPage(item.id);
                                onClose(); // Close sidebar on navigation
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${currentPage === item.id
                                    ? 'bg-custom-teal-active text-white shadow-md'
                                    : 'text-slate-600 dark:text-gray-400 hover:bg-gray-200/60 dark:hover:bg-slate-800/60'
                                }`}
                        >
                            <Icon component={item.icon} className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;