// src/App.js

import React, { useState, useEffect } from 'react';
import { uiTextConfig, systemPrompts } from './config';
import { setCookie, getCookie } from './utils/cookieHelper';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GeneratorPage from './components/GeneratorPage';
import SettingsPage from './components/SettingsPage';
import Footer from './components/Footer';
import ThankYouModal from './components/ThankYouModal';
import NotificationModal from './components/NotificationModal'; // Diganti
import RegenerateModal from './components/RegenerateModal';

export default function App() {
    // Core App State
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('id');
    const [currentPage, setCurrentPage] = useState('generator');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatedContent, setGeneratedContent] = useState([]);
    const [showInitialSetup, setShowInitialSetup] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Baru

    // Modal & Notification State
    const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
    const [isRegenModalOpen, setIsRegenModalOpen] = useState(false);
    const [notification, setNotification] = useState({ isOpen: false, message: '' }); // Baru
    const [regenModalData, setRegenModalData] = useState({ content: null, index: -1, type: '' });
    
    // UI Text
    const uiText = uiTextConfig[language];

    // Form Inputs
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [languageStyle, setLanguageStyle] = useState('Storytelling');
    const [hookType, setHookType] = useState('Problem Call Out');
    const [contentType, setContentType] = useState('single');
    const [scriptCount, setScriptCount] = useState(1);
    const [carouselSlideCount, setCarouselSlideCount] = useState(5);
    const [targetAudience, setTargetAudience] = useState('Profesional Muda');
    
    // Settings
    const [systemPrompt, setSystemPrompt] = useState(systemPrompts.id);
    const [savedSystemPrompt, setSavedSystemPrompt] = useState(systemPrompts.id);
    const [apiMode, setApiMode] = useState('default');
    const [userApiKey, setUserApiKey] = useState('');
    const [savedApiKey, setSavedApiKey] = useState('');
    
    // --- EFFECTS ---
    
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);
    
    useEffect(() => {
        setSystemPrompt(systemPrompts[language]);
        setSavedSystemPrompt(systemPrompts[language]);
    }, [language]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.async = true;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
    }, []);

    useEffect(() => {
        const keyFromCookie = getCookie('anotechhub_apikey');
        const hasVisited = getCookie('anotechhub_visited');
        if (keyFromCookie) {
            setApiMode('custom');
            setUserApiKey(keyFromCookie);
            setSavedApiKey(keyFromCookie);
            setShowInitialSetup(false);
        } else if (!hasVisited) {
            setShowInitialSetup(true);
        }
    }, []);

    // --- API & LOGIC ---

    const getApiResponse = async (prompt, schema) => {
        // Menggunakan environment variable Netlify sesuai permintaan Anda
        const activeApiKey = apiMode === 'custom' && savedApiKey ? savedApiKey : process.env.REACT_APP_DEFAULT_API_KEY;
        
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
        // (Logika fungsi ini tidak berubah, bisa gunakan versi sebelumnya)
        if (!productName || !productDesc) { 
            setError(uiText.productName + " and " + uiText.productDesc + " cannot be empty.");
            return; 
        }
        if (apiMode === 'custom' && !savedApiKey) {
            setError(uiText.errorSetApiKey);
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
        // (Logika fungsi ini tidak berubah, bisa gunakan versi sebelumnya)
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
    
    const showNotification = (message) => {
        setNotification({ isOpen: true, message });
    };

    const handleSaveApiSettings = () => {
        if (apiMode === 'custom') {
            setCookie('anotechhub_apikey', userApiKey, 365);
            setSavedApiKey(userApiKey);
            if (userApiKey) showNotification(uiText.apiKeyAppliedMessage);
        } else {
            setCookie('anotechhub_apikey', '', -1);
            setSavedApiKey('');
            setUserApiKey('');
            showNotification(uiText.settingsSavedMessage);
        }
        setCookie('anotechhub_visited', 'true', 365);
        setShowInitialSetup(false);
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
        const generatorProps = { isLoading, generatedContent, error, setError, productName, setProductName, productDesc, setProductDesc, languageStyle, setLanguageStyle, hookType, setHookType, scriptCount, setScriptCount, carouselSlideCount, setCarouselSlideCount, targetAudience, setTargetAudience, contentType, setContentType, onGenerate: handleGenerate, onReset: handleReset, openThankYouModal: () => setIsThankYouModalOpen(true), openRegenModal, uiText, showInitialSetup, setShowInitialSetup, setCurrentPage };
        
        switch (currentPage) {
            case 'generator':
                return <GeneratorPage {...generatorProps} />;
            case 'settings':
                return <SettingsPage systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt} savedSystemPrompt={savedSystemPrompt} onSaveSystemPrompt={() => {setSavedSystemPrompt(systemPrompt); showNotification(uiText.settingsSavedMessage);}} apiMode={apiMode} setApiMode={setApiMode} userApiKey={userApiKey} setUserApiKey={setUserApiKey} onSaveApiSettings={handleSaveApiSettings} uiText={uiText} setCurrentPage={setCurrentPage} />;
            default:
                return <GeneratorPage {...generatorProps} />;
        }
    };

    return (
        <div className={`min-h-screen font-sans flex flex-col ${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-slate-900 text-gray-200'} transition-colors duration-300`}>
            <Header theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} uiText={uiText} onLogoClick={() => setCurrentPage('generator')} onUserClick={() => setIsMobileSidebarOpen(true)} />
            <div className="flex flex-1">
                <main className="flex-1 p-4 sm:p-6 lg:p-8">{renderPage()}</main>
                <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} uiText={uiText} isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
            </div>
            <Footer />
            <ThankYouModal isOpen={isThankYouModalOpen} onClose={() => setIsThankYouModalOpen(false)} uiText={uiText} />
            <NotificationModal isOpen={notification.isOpen} onClose={() => setNotification({ isOpen: false, message: '' })} message={notification.message} />
            <RegenerateModal isOpen={isRegenModalOpen} onClose={() => setIsRegenModalOpen(false)} content={regenModalData.content} onRegenerate={handleModalRegenerate} contentType={regenModalData.type} uiText={uiText} />
        </div>
    );
}