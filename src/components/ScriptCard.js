// src/components/ScriptCard.js

import React from 'react';
import { Edit } from 'lucide-react';

const ScriptCard = ({ script, index, openRegenModal, uiText, hookType }) => (
    <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm p-6 transition-all duration-300 group">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg mb-4 text-custom-teal dark:text-custom-teal-light pr-4">{script.title}</h3>
            <button onClick={() => openRegenModal(script, index, 'single')} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-custom-teal dark:hover:text-custom-teal-light p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <Edit className="w-4 h-4" /><span>{uiText.editAndRegenerate}</span>
            </button>
        </div>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-lg border-l-4 border-rose-400">
                <p className="font-semibold text-rose-800 dark:text-rose-300">{uiText.hookStyleTitle}: {hookType}</p>
                <p className="mt-1 text-sm">{script.problem}</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <p className="font-semibold text-blue-800 dark:text-blue-300">{uiText.storytellingBody}</p>
                <p className="mt-1 text-sm leading-relaxed">{script.story}</p>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border-l-4 border-emerald-500">
                <p className="font-semibold text-emerald-800 dark:text-emerald-400">{uiText.callToAction}</p>
                <p className="mt-1 text-sm">{script.cta}</p>
            </div>
        </div>
    </div>
);

export default ScriptCard;