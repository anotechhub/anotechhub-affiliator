import React from 'react';
import { KeyRound, X } from 'lucide-react';

const ApiKeyAppliedModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-8 text-center relative transform transition-all" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-6 h-6" /></button>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4"><KeyRound className="h-8 w-8 text-blue-600 dark:text-blue-400" /></div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">API Key Applied!</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Your API key has been saved and will be used for future requests.</p>
                <button onClick={onClose} className="mt-6 w-full bg-custom-teal hover:bg-custom-teal-dark text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all">Got it</button>
            </div>
        </div>
    );
};

export default ApiKeyAppliedModal;