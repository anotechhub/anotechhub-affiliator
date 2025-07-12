// src/components/SettingsPage.js

import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff, AlertTriangle } from 'lucide-react';

const SelectWrapper = ({ children }) => (
    <div className="relative">
        {React.cloneElement(children, { className: `${children.props.className} appearance-none` })}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
);

const SettingsPage = ({ systemPrompt, setSystemPrompt, savedSystemPrompt, onSaveSystemPrompt, apiMode, setApiMode, userApiKey, setUserApiKey, onSaveApiSettings, uiText }) => {
    const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
    const labelStyle = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";
    const inputStyle = "w-full p-3 bg-white/60 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 ring-custom-teal focus:border-custom-teal outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500";

    return (
        <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-6">{uiText.settingsTitle}</h2>
            <div className="space-y-8">
                {/* API Settings */}
                <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">{uiText.apiSettings}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{uiText.apiSettingsDesc}</p>
                    <div>
                        <label htmlFor="api-mode" className={labelStyle}>{uiText.apiMode}</label>
                        <SelectWrapper>
                            <select id="api-mode" value={apiMode} onChange={(e) => setApiMode(e.target.value)} className={inputStyle}>
                                <option value="default">{uiText.apiModeDefault}</option>
                                <option value="custom">{uiText.apiModeCustom}</option>
                            </select>
                        </SelectWrapper>
                    </div>
                    {apiMode === 'custom' ? (
                        <div className="mt-4">
                            <div className="relative">
                                <label htmlFor="api-key" className={labelStyle}>{uiText.yourApiKey}</label>
                                <input
                                    type={isApiKeyVisible ? "text" : "password"}
                                    id="api-key"
                                    value={userApiKey}
                                    onChange={(e) => setUserApiKey(e.target.value)}
                                    className={`${inputStyle} pr-10`}
                                    placeholder={uiText.apiKeyPlaceholder}
                                />
                                <button onClick={() => setIsApiKeyVisible(!isApiKeyVisible)} className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                    {isApiKeyVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{uiText.apiKeySaveWarning}</p>
                        </div>
                    ) : (
                         <div className="mt-4 p-4 bg-amber-100/60 dark:bg-amber-900/30 rounded-lg text-amber-800 dark:text-amber-300 text-sm flex gap-3">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{uiText.apiKeyWarning}</span>
                        </div>
                    )}
                    <button onClick={onSaveApiSettings} className="mt-4 inline-flex items-center justify-center gap-2 bg-custom-teal hover:bg-custom-teal-dark text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">{uiText.saveApiSettings}</button>
                </div>

                {/* System Prompt Settings */}
                <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">{uiText.systemPrompt}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{uiText.systemPromptDesc}</p>
                    <div>
                        <label htmlFor="system-prompt" className={labelStyle}>{uiText.promptInstruction}</label>
                        <textarea id="system-prompt" value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} className={`${inputStyle} min-h-[150px]`}></textarea>
                    </div>
                    <button onClick={onSaveSystemPrompt} className="mt-4 inline-flex items-center justify-center gap-2 bg-custom-teal hover:bg-custom-teal-dark text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">{uiText.saveChanges}</button>
                </div>
                
                <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">{uiText.activePrompt}</h3>
                    <div className="p-4 bg-gray-100 dark:bg-slate-900/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">{savedSystemPrompt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;