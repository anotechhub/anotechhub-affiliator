import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GeneratorPage from './components/GeneratorPage';
import SettingsPage from './components/SettingsPage';
import ThankYouModal from './components/ThankYouModal';
import ApiKeyAppliedModal from './components/ApiKeyAppliedModal';
import RegenerateModal from './components/RegenerateModal';

// Main App Component
export default function App() {
    const [theme, setTheme] = useState('light');
    const [currentPage, setCurrentPage] = useState('generator');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatedContent, setGeneratedContent] = useState([]);
    const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    const [isRegenModalOpen, setIsRegenModalOpen] = useState(false);
    const [regenModalData, setRegenModalData] = useState({ content: null, index: -1, type: '' });
    
    // State for form inputs
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [languageStyle, setLanguageStyle] = useState('Storytelling');
    const [hookType, setHookType] = useState('Problem/Agitate/Solve');
    const [contentType, setContentType] = useState('single');
    const [scriptCount, setScriptCount] = useState(1);
    const [carouselSlideCount, setCarouselSlideCount] = useState(5);
    const [targetAudience, setTargetAudience] = useState('Adults');
    
    // Settings State
    const [systemPrompt, setSystemPrompt] = useState("You are an expert AI copywriter specializing in creating engaging affiliate marketing scripts. Generate creative and persuasive responses based on the provided product details.");
    const [savedSystemPrompt, setSavedSystemPrompt] = useState(systemPrompt);
    const [apiMode, setApiMode] = useState('default'); 
    const [userApiKey, setUserApiKey] = useState('');
    const [savedApiKey, setSavedApiKey] = useState('');

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const getApiResponse = async (prompt, schema) => {
        const activeApiKey = apiMode === 'custom' ? savedApiKey : ""; // Use saved key if in custom mode
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
            setError("Product Name and Description cannot be empty.");
            return;
        }
        if (apiMode === 'custom' && !savedApiKey) {
            setError("Custom API Mode is active, but no API key is saved. Please enter your API key in the Settings page.");
            return;
        }
        setIsLoading(true);
        setGeneratedContent([]);
        setError(null);

        let userPrompt;
        let schema;
        const basePromptInfo = `\nProduct Name: "${productName}"\nDescription: "${productDesc}"\nLanguage Style: ${languageStyle}\nTarget Audience: ${targetAudience}\nHook Type to use: "${hookType}".`;

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

    const openRegenModal = (content, index, type) => {
        setRegenModalData({ content, index, type });
        setIsRegenModalOpen(true);
    };
    
    const handleModalRegenerate = async (instructions, updatedContent = null) => {
        const { content, index, type } = regenModalData;
        if (updatedContent) {
            setGeneratedContent(prev => prev.map((item, i) => (i === index ? updatedContent : item)));
            return;
        }
        const originalText = type === 'single'
            ? `Title: ${content.title}\nProblem: ${content.problem}\nStory: ${content.story}\nCTA: ${content.cta}`
            : `Title: ${content.title}\nContent: ${content.content}`;

        const regenPrompt = `Revise the following text based on the given instructions.\n\nInstructions: "${instructions}"\n\nOriginal Text:\n${originalText}\n\nProvide only the result in the exact same JSON format as the original.`;
        
        let schema = type === 'single'
            ? { type: "OBJECT", properties: { title: { type: "STRING" }, problem: { type: "STRING" }, story: { type: "STRING" }, cta: { type: "STRING" } }, required: ["title", "problem", "story", "cta"] }
            : { type: "OBJECT", properties: { title: { type: "STRING" }, content: { type: "STRING" } }, required: ["title", "content"] };

        try {
            const parsedJson = await getApiResponse(regenPrompt, schema);
            if (type === 'carousel') {
                parsedJson.slide_number = content.slide_number;
            }
            return parsedJson;
        } catch (e) {
            console.error("Failed to regenerate:", e);
            alert(`Failed to regenerate: ${e.message}`);
            return null;
        }
    };

    const handleSaveApiSettings = () => {
        setSavedApiKey(userApiKey);
        if (apiMode === 'custom' && userApiKey) {
            setIsApiKeyModalOpen(true);
        }
    };

    const handleReset = () => {
        setProductName('');
        setProductDesc('');
        setGeneratedContent([]);
        setError(null);
    };

    const renderPage = () => {
        const generatorProps = { isLoading, generatedContent, error, setError, productName, setProductName, productDesc, setProductDesc, languageStyle, setLanguageStyle, hookType, setHookType, scriptCount, setScriptCount, carouselSlideCount, setCarouselSlideCount, targetAudience, setTargetAudience, contentType, setContentType, onGenerate: handleGenerate, onReset: handleReset, openThankYouModal: () => setIsThankYouModalOpen(true), openRegenModal };
        switch (currentPage) {
            case 'generator':
                return <GeneratorPage {...generatorProps} />;
            case 'settings':
                return <SettingsPage systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt} savedSystemPrompt={savedSystemPrompt} onSaveSystemPrompt={() => setSavedSystemPrompt(systemPrompt)} apiMode={apiMode} setApiMode={setApiMode} userApiKey={userApiKey} setUserApiKey={setUserApiKey} onSaveApiSettings={handleSaveApiSettings} />;
            default:
                return <GeneratorPage {...generatorProps} />;
        }
    };
    
    const Footer = () => (
      <footer className="text-center p-4 text-xs text-gray-500 sm:p-6 dark:text-gray-400 border-t border-gray-200 dark:border-slate-800">
          © {new Date().getFullYear()} AnotechHub
      </footer>
    );

    return (
        <div className={`min-h-screen font-sans flex flex-col ${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-slate-900 text-gray-200'} transition-colors duration-300`}>
            <Header theme={theme} setTheme={setTheme} />
            <div className="flex flex-1">
                <main className="flex-1 p-4 lg:p-8">{renderPage()}</main>
                <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <Footer />
            <ThankYouModal isOpen={isThankYouModalOpen} onClose={() => setIsThankYouModalOpen(false)} />
            <ApiKeyAppliedModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} />
            <RegenerateModal isOpen={isRegenModalOpen} onClose={() => setIsRegenModalOpen(false)} content={regenModalData.content} onRegenerate={handleModalRegenerate} contentType={regenModalData.type} />
        </div>
    );
}