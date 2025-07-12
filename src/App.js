import React, { useState, useEffect } from 'react';
import { uiTextConfig, systemPrompts } from './config';
import { setCookie, getCookie } from './utils/cookieHelper';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GeneratorPage from './components/GeneratorPage';
import SettingsPage from './components/SettingsPage';
import Footer from './components/Footer';
import ThankYouModal from './components/ThankYouModal';
import ApiKeyAppliedModal from './components/ApiKeyAppliedModal';
import RegenerateModal from './components/RegenerateModal';

export default function App() {
    // Core App State
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');
    const [currentPage, setCurrentPage] = useState('generator');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatedContent, setGeneratedContent] = useState([]);
    
    // Modal State
    const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    const [isRegenModalOpen, setIsRegenModalOpen] = useState(false);
    const [regenModalData, setRegenModalData] = useState({ content: null, index: -1, type: '' });
    
    // UI Text based on language
    const uiText = uiTextConfig[language];

    // Form Inputs State
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [languageStyle, setLanguageStyle] = useState('Storytelling');
    const [hookType, setHookType] = useState('Problem/Agitate/Solve');
    const [contentType, setContentType] = useState('single');
    const [scriptCount, setScriptCount] = useState(1);
    const [carouselSlideCount, setCarouselSlideCount] = useState(5);
    const [targetAudience, setTargetAudience] = useState('Adults');
    
    // Settings State
    const [systemPrompt, setSystemPrompt] = useState(systemPrompts[language]);
    const [savedSystemPrompt, setSavedSystemPrompt] = useState(systemPrompts[language]);
    const [apiMode, setApiMode] = useState('default'); 
    const [userApiKey, setUserApiKey] = useState('');
    const [savedApiKey, setSavedApiKey] = useState('');
    
    // --- EFFECTS ---
    
    // Theme Switcher
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);
    
    // Language Switcher
    useEffect(() => {
        setSystemPrompt(systemPrompts[language]);
        setSavedSystemPrompt(systemPrompts[language]);
    }, [language]);

    // PDF Library Loader
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Load API Key from Cookie on initial load
    useEffect(() => {
        const keyFromCookie = getCookie('anotechhub_apikey');
        if (keyFromCookie) {
            setApiMode('custom');
            setUserApiKey(keyFromCookie);
            setSavedApiKey(keyFromCookie);
        }
    }, []);

    // --- API & LOGIC ---

    const getApiResponse = async (prompt, schema) => {
        const activeApiKey = apiMode === 'custom' ? savedApiKey : process.env.REACT_APP_DEFAULT_API_KEY;
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", responseSchema: schema }
        };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`API Error: ${response.status} ${await response.text()}`);
        const result = await response.json();
        if (!result.candidates?.[0]?.content?.parts?.[0]) throw new Error("Unexpected response structure from AI.");
        return JSON.parse(result.candidates[0].content.parts[0].text);
    };
    
    const handleGenerate = async () => {
        if (!productName || !productDesc) {
            setError(uiText.productName + " and " + uiText.productDesc + " cannot be empty.");
            return;
        }
        if (apiMode === 'custom' && !savedApiKey) {
            setError("Custom API Mode is active, but no API key is saved. Please enter your API key in the Settings page.");
            return;
        }
        setIsLoading(true);
        setGeneratedContent([]);
        setError(null);

        const languageResponse = language === 'id' ? 'Indonesian' : 'English';
        const basePromptInfo = `\nProduct Name: "${productName}"\nDescription: "${productDesc}"\nLanguage Style: ${languageStyle}\nTarget Audience: ${targetAudience}\nHook Type to use: "${hookType}".\nRespond in ${languageResponse}.`;
        let userPrompt, schema;
        if (contentType === 'single') {
            userPrompt = `Create ${scriptCount} promotional scripts for the following product:${basePromptInfo}`;
            schema = { type: "OBJECT", properties: { scripts: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, problem: { type: "STRING" }, story: { type: "STRING" }, cta: { type: "STRING" } }, required: ["title", "problem", "story", "cta"] } } }, required: ["scripts"] };
        } else {
            userPrompt = `Create content for ${carouselSlideCount} Instagram carousel slides about the following product. Each slide should be a short, engaging point with its own title. The overall structure should follow the requested hook type.${basePromptInfo}`;
            schema = { type: "OBJECT", properties: { slides: { type: "ARRAY", items: { type: "OBJECT", properties: { slide_number: { type: "NUMBER" }, title: { type: "STRING" }, content: { type: "STRING" } }, required: ["slide_number", "title", "content"] } } }, required: ["slides"] };
        }
        const finalPrompt = `${savedSystemPrompt}\n\n${userPrompt}`;
        try {
            const parsedJson = await getApiResponse(finalPrompt, schema);
            if (contentType === 'single') setGeneratedContent(parsedJson.scripts || []);
            else setGeneratedContent(parsedJson.slides || []);
        } catch (e) {
            console.error(e);
            setError(`An error occurred while communicating with the AI: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalRegenerate = async (instructions, updatedContent = null) => {
        const { content, index, type } = regenModalData;
        if (updatedContent) {
            setGeneratedContent(prev => prev.map((item, i) => (i === index ? updatedContent : item)));
            return;
        }
        const languageResponse = language === 'id' ? 'Indonesian' : 'English';
        const originalText = type === 'single' ? `Title: ${content.title}\nProblem: ${content.problem}\nStory: ${content.story}\nCTA: ${content.cta}` : `Title: ${content.title}\nContent: ${content.content}`;
        const regenPrompt = `Revise the following text based on the given instructions.\n\nInstructions: "${instructions}"\n\nOriginal Text:\n${originalText}\n\nProvide only the result in the exact same JSON format as the original. Respond in ${languageResponse}.`;
        let schema = type === 'single' ? { type: "OBJECT", properties: { title: { type: "STRING" }, problem: { type: "STRING" }, story: { type: "STRING" }, cta: { type: "STRING" } }, required: ["title", "problem", "story", "cta"] } : { type: "OBJECT", properties: { title: { type: "STRING" }, content: { type: "STRING" } }, required: ["title", "content"] };
        try {
            const parsedJson = await getApiResponse(regenPrompt, schema);
            if (type === 'carousel') parsedJson.slide_number = content.slide_number;
            return parsedJson;
        } catch (e) {
            console.error("Failed to regenerate:", e);
            alert(`Failed to regenerate: ${e.message}`);
            return null;
        }
    };

    const handleSaveApiSettings = () => {
        if (apiMode === 'custom') {
            setCookie('anotechhub_apikey', userApiKey, 365);
            setSavedApiKey(userApiKey);
            if (userApiKey) setIsApiKeyModalOpen(true);
        } else {
            setCookie('anotechhub_apikey', '', -1); // Expire cookie
            setSavedApiKey('');
            setUserApiKey('');
        }
    };
    
    const handleReset = () => {
        setProductName('');
        setProductDesc('');
        setGeneratedContent([]);
        setError(null);
    };
    
    const openRegenModal = (content, index, type) => {
        setRegenModalData({ content, index, type });
        setIsRegenModalOpen(true);
    };

    // --- RENDER ---
    
    const renderPage = () => {
        const generatorProps = { isLoading, generatedContent, error, setError, productName, setProductName, productDesc, setProductDesc, languageStyle, setLanguageStyle, hookType, setHookType, scriptCount, setScriptCount, carouselSlideCount, setCarouselSlideCount, targetAudience, setTargetAudience, contentType, setContentType, onGenerate: handleGenerate, onReset: handleReset, openThankYouModal: () => setIsThankYouModalOpen(true), openRegenModal, uiText };
        
        switch (currentPage) {
            case 'generator':
                return <GeneratorPage {...generatorProps} />;
            case 'settings':
                return <SettingsPage systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt} savedSystemPrompt={savedSystemPrompt} onSaveSystemPrompt={() => setSavedSystemPrompt(systemPrompt)} apiMode={apiMode} setApiMode={setApiMode} userApiKey={userApiKey} setUserApiKey={setUserApiKey} onSaveApiSettings={handleSaveApiSettings} uiText={uiText} />;
            default:
                return <GeneratorPage {...generatorProps} />;
        }
    };

    return (
        <div className={`min-h-screen font-sans flex flex-col ${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-slate-900 text-gray-200'} transition-colors duration-300`}>
            <Header theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} uiText={uiText} />
            <div className="flex flex-1">
                <main className="flex-1 p-4 sm:p-6 lg:p-8">{renderPage()}</main>
                <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} uiText={uiText} />
            </div>
            <Footer />
            <ThankYouModal isOpen={isThankYouModalOpen} onClose={() => setIsThankYouModalOpen(false)} uiText={uiText} />
            <ApiKeyAppliedModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} uiText={uiText} />
            <RegenerateModal isOpen={isRegenModalOpen} onClose={() => setIsRegenModalOpen(false)} content={regenModalData.content} onRegenerate={handleModalRegenerate} contentType={regenModalData.type} uiText={uiText} />
        </div>
    );
}