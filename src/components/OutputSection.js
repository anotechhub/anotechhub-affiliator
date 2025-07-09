import React from 'react';
import { Bot, AlertTriangle, FileText } from 'lucide-react';
import ScriptCard from './ScriptCard';
import CarouselSlideCard from './CarouselSlideCard';

const OutputSection = ({ isLoading, generatedContent, error, setError, contentType, openRegenModal }) => (
    <div className="lg:col-span-8">
        <div className="h-full">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-white/30 dark:bg-slate-800/30 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700 p-8">
                    <Bot className="w-16 h-16 text-custom-teal animate-bounce" />
                    <p className="mt-4 text-lg font-semibold text-gray-600 dark:text-gray-400">AI is crafting your scripts...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Please wait a moment.</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-dashed border-rose-300 dark:border-rose-700 p-8 text-center">
                    <AlertTriangle className="w-16 h-16 text-rose-400" />
                    <p className="mt-4 text-lg font-semibold text-rose-700 dark:text-rose-300">Failed to Generate Scripts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-md">{error}</p>
                    <button onClick={() => setError(null)} className="mt-4 bg-rose-500 text-white font-bold py-2 px-4 rounded-lg">Try Again</button>
                </div>
            ) : generatedContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-white/30 dark:bg-slate-800/30 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700 p-8 text-center">
                    <FileText className="w-16 h-16 text-gray-300 dark:text-slate-600" />
                    <p className="mt-4 text-lg font-semibold text-gray-600 dark:text-gray-400">Your generated scripts will appear here.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Fill out the form and click "Generate Script with AI" to start.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {contentType === 'single'
                        ? generatedContent.map((script, index) => (<ScriptCard key={index} script={script} index={index} openRegenModal={openRegenModal} />))
                        : generatedContent.map((slide, index) => (<CarouselSlideCard key={index} slide={slide} index={index} openRegenModal={openRegenModal} />))
                    }
                </div>
            )}
        </div>
    </div>
);

export default OutputSection;