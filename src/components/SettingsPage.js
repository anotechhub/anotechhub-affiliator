import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectWrapper = ({ children }) => (
    <div className="relative">
        {React.cloneElement(children, { className: `${children.props.className} appearance-none` })}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
);

const SettingsPage = ({ systemPrompt, setSystemPrompt, savedSystemPrompt, onSaveSystemPrompt, apiMode, setApiMode, userApiKey, setUserApiKey, onSaveApiSettings }) => {
    const labelStyle = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";
    const inputStyle = "w-full p-3 bg-white/60 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 ring-custom-teal focus:border-custom-teal outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500";

    return (
        <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-8">
                {/* API Settings */}
                <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">API Settings</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage your API key to access external AI tools.</p>
                    <div>
                        <label htmlFor="api-mode" className={labelStyle}>API Mode</label>
                        <SelectWrapper>
                            <select id="api-mode" value={apiMode} onChange={(e) => setApiMode(e.target.value)} className={inputStyle}>
                                <option value="default">Use AnoTechHub's Default Key</option>
                                <option value="custom">Use Your Own API Key</option>
                            </select>
                        </SelectWrapper>
                    </div>
                    {apiMode === 'custom' && (
                        <div className="mt-4">
                            <label htmlFor="api-key" className={labelStyle}>Your Gemini API Key</label>
                            <input type="password" id="api-key" value={userApiKey} onChange={(e) => setUserApiKey(e.target.value)} className={inputStyle} placeholder="Enter your API key here..." />
                        </div>
                    )}
                    <button onClick={onSaveApiSettings} className="mt-4 inline-flex items-center justify-center gap-2 bg-custom-teal hover:bg-custom-teal-dark text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">Save API Settings</button>
                </div>

                {/* System Prompt Settings */}
                <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">System Instruction Prompt</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">This prompt will guide the AI's personality and response style.</p>
                    <div>
                        <label htmlFor="system-prompt" className={labelStyle}>Prompt Instruction</label>
                        <textarea id="system-prompt" value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} className={`${inputStyle} min-h-[150px]`}></textarea>
                    </div>
                    <button onClick={onSaveSystemPrompt} className="mt-4 inline-flex items-center justify-center gap-2 bg-custom-teal hover:bg-custom-teal-dark text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">Save Changes</button>
                </div>
                
                <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Active Prompt Instruction</h3>
                    <div className="p-4 bg-gray-100 dark:bg-slate-900/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">{savedSystemPrompt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;