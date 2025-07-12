import React, { useState, useEffect } from 'react';
import { Wand2, X } from 'lucide-react';

const RegenerateModal = ({ isOpen, onClose, content, onRegenerate, contentType, uiText }) => {
    const [instructions, setInstructions] = useState('');
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [newVersion, setNewVersion] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setInstructions('');
            setNewVersion(null);
            setIsRegenerating(false);
        }
    }, [isOpen]);

    const handleRegenerateClick = async () => {
        setIsRegenerating(true);
        const result = await onRegenerate(instructions);
        setNewVersion(result);
        setIsRegenerating(false);
    };

    const handleAccept = () => {
        onRegenerate(instructions, newVersion);
        onClose();
    };

    if (!isOpen || !content) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl p-6 relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 border-b pb-4 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{uiText.editAndRegenerateModalTitle}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-6 h-6" /></button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">{uiText.originalVersion}</h4>
                            <div className="bg-gray-100 dark:bg-slate-900/50 p-4 rounded-lg text-sm space-y-2 text-gray-600 dark:text-gray-400">
                                {contentType === 'single' ? (
                                    <>
                                        <p className="font-bold">{content.title}</p>
                                        <p><strong>Problem:</strong> {content.problem}</p>
                                        <p><strong>Story:</strong> {content.story}</p>
                                        <p><strong>CTA:</strong> {content.cta}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-bold">{content.title}</p>
                                        <p>{content.content}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">{uiText.newVersion}</h4>
                            <div className="bg-gray-100 dark:bg-slate-900/50 p-4 rounded-lg text-sm min-h-[150px] flex items-center justify-center">
                                {isRegenerating ? (
                                    <div className="text-center">
                                        <div className="mx-auto w-6 h-6 border-2 border-custom-teal border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-xs mt-2">{uiText.aiIsWorking}</p>
                                    </div>
                                ) : newVersion ? (
                                    <div className="space-y-2 text-gray-800 dark:text-gray-200">
                                        {contentType === 'single' ? (
                                            <>
                                                <p className="font-bold">{newVersion.title}</p>
                                                <p><strong>Problem:</strong> {newVersion.problem}</p>
                                                <p><strong>Story:</strong> {newVersion.story}</p>
                                                <p><strong>CTA:</strong> {newVersion.cta}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="font-bold">{newVersion.title}</p>
                                                <p>{newVersion.content}</p>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">{uiText.newVersionPlaceholder}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{uiText.revisionInstructions}</label>
                        <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows="3" className="w-full p-2 rounded-lg bg-gray-100 dark:bg-slate-700 focus:ring-2 ring-custom-teal" placeholder={uiText.revisionPlaceholder}></textarea>
                    </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 border-t pt-4 dark:border-slate-700">
                    <button onClick={handleRegenerateClick} disabled={isRegenerating || !instructions} className="w-full flex items-center justify-center gap-2 bg-custom-teal hover:bg-custom-teal-dark text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-all disabled:bg-teal-400 disabled:cursor-not-allowed">
                        <Wand2 className="w-5 h-5" />{uiText.regenerate}
                    </button>
                    <button onClick={handleAccept} disabled={!newVersion || isRegenerating} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-all disabled:bg-green-400 disabled:cursor-not-allowed">
                        {uiText.useThisVersion}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegenerateModal;