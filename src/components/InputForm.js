// src/components/InputForm.js

import React from 'react';
import { jsPDF } from "jspdf";
import { ChevronDown, Bot, RotateCcw, FileDown } from 'lucide-react';

const SelectWrapper = ({ children }) => (
    <div className="relative">
        {React.cloneElement(children, { className: `${children.props.className} appearance-none` })}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
);

const InputForm = ({ onGenerate, onReset, isLoading, openThankYouModal, ...props }) => {
    const {
        productName, setProductName, productDesc, setProductDesc,
        languageStyle, setLanguageStyle, hookType, setHookType, scriptCount,
        setScriptCount, carouselSlideCount, setCarouselSlideCount, targetAudience,
        setTargetAudience, generatedContent, contentType, setContentType, uiText
    } = props;

    const inputStyle = "w-full p-3 bg-white/60 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 ring-custom-teal focus:border-custom-teal outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500";
    const labelStyle = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";

    const hookOptions = {
        en: ["Stop Scrolling", "You're Doing It Wrong", "Unpopular Opinion", "POV (Point of View)", "Get Ready With Me", "Things I Wish I Knew", "Life Hack", "The Result vs. The Process", "Storytime", "Direct Question"],
        id: ["Hook 'Berhenti Scrolling'", "Hook 'Cara Kamu Salah'", "Hook 'Opini Tidak Populer'", "Hook 'POV (Sudut Pandang)'", "Hook 'Get Ready With Me'", "Hook 'Andai Aku Tahu Lebih Awal'", "Hook 'Tips & Trik Praktis'", "Hook 'Hasil vs. Proses'", "Hook 'Waktunya Cerita'", "Hook 'Pertanyaan Langsung'"]
    };

    const audienceOptions = {
        en: ["Students", "Young Professionals", "Parents", "Gamers", "Tech Enthusiasts", "Fashion & Beauty", "Fitness & Health", "General"],
        id: ["Pelajar & Mahasiswa", "Profesional Muda", "Orang Tua", "Gamers", "Penggemar Teknologi", "Fashion & Kecantikan", "Kebugaran & Kesehatan", "Umum"]
    };

    const handlePdfDownload = () => {
        if (!window.jspdf) {
            alert("PDF library is not loaded yet.");
            return;
        }
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'pt', 'a4');

        const addStyledText = (text, x, y, options) => {
            pdf.setFont(options.font || 'helvetica', options.style || 'normal');
            pdf.setFontSize(options.size || 10);
            pdf.setTextColor(options.color || '#000000');
            const lines = pdf.splitTextToSize(text, options.maxWidth || 550);
            pdf.text(lines, x, y);
            return pdf.getTextDimensions(lines).h;
        };

        let yPos = 40;

        generatedContent.forEach((item, index) => {
            if (index > 0 && contentType === 'single') { yPos += 40; }
            if (yPos > 780) { pdf.addPage(); yPos = 40; }

            if (contentType === 'single') {
                const titleHeight = addStyledText(item.title, 40, yPos, { size: 16, style: 'bold', color: '#01a1a8' });
                yPos += titleHeight + 20;

                const drawSection = (title, text, titleColor, boxColor, borderColor) => {
                    if (yPos > pdf.internal.pageSize.getHeight() - 100) {
                        pdf.addPage();
                        yPos = 40;
                    }
                    const titleHeight = addStyledText(title, 50, yPos + 15, { size: 10, style: 'bold', color: titleColor, maxWidth: 495 });
                    const textHeight = addStyledText(text, 50, yPos + 15 + titleHeight + 5, { size: 10, color: '#374151', maxWidth: 495 });
                    const boxHeight = titleHeight + textHeight + 30;
                    
                    pdf.setDrawColor(borderColor);
                    pdf.setFillColor(boxColor);
                    pdf.roundedRect(40, yPos, 515, boxHeight, 3, 3, 'FD');

                    addStyledText(title, 50, yPos + 15, { size: 10, style: 'bold', color: titleColor, maxWidth: 495 });
                    addStyledText(text, 50, yPos + 15 + titleHeight + 5, { size: 10, color: '#374151', maxWidth: 495 });
                    
                    yPos += boxHeight + 15;
                };

                drawSection(`${uiText.hookStyleTitle}: ${hookType}`, item.problem, '#991b1b', '#fef2f2', '#fecaca');
                drawSection(uiText.storytellingBody, item.story, '#1e40af', '#eff6ff', '#dbeafe');
                drawSection(uiText.callToAction, item.cta, '#166534', '#f0fdf4', '#bbf7d0');

            } else { // Carousel logic from previous version
                if (yPos + 100 > pdf.internal.pageSize.getHeight()) {
                    pdf.addPage();
                    yPos = 40;
                }
                addStyledText(`Slide ${item.slide_number}: ${item.title}`, 40, yPos, { size: 14, style: 'bold', color: '#01a1a8' });
                yPos += 20;
                yPos += addStyledText(item.content, 40, yPos, { size: 11, color: '#374151', maxWidth: 515 });
                yPos += 25;
                if (index < generatedContent.length - 1) {
                    pdf.setDrawColor('#e2e8f0');
                    pdf.line(40, yPos, 555, yPos);
                    yPos += 20;
                }
            }
        });

        pdf.save('anotechhub_scripts.pdf');
        openThankYouModal();
    };


    return (
        <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>{uiText.contentType}</label>
                        <div className="flex gap-2 rounded-lg bg-gray-200/80 dark:bg-slate-900/80 p-1">
                            <button onClick={() => setContentType('single')} className={`w-full p-2 rounded-md text-sm font-semibold transition-all ${contentType === 'single' ? 'bg-custom-teal text-white shadow' : 'text-gray-600 dark:text-gray-400'}`}>{uiText.singlePost}</button>
                            <button onClick={() => setContentType('carousel')} className={`w-full p-2 rounded-md text-sm font-semibold transition-all ${contentType === 'carousel' ? 'bg-custom-teal text-white shadow' : 'text-gray-600 dark:text-gray-400'}`}>{uiText.carousel}</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="product-name" className={labelStyle}>{uiText.productName}</label>
                        <input type="text" id="product-name" className={inputStyle} placeholder={uiText.productNamePlaceholder} value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="product-desc" className={labelStyle}>{uiText.productDesc}</label>
                        <textarea id="product-desc" rows="4" className={inputStyle} placeholder={uiText.productDescPlaceholder} value={productDesc} onChange={(e) => setProductDesc(e.target.value)}></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="style" className={labelStyle}>{uiText.languageStyle}</label>
                            <SelectWrapper><select id="style" className={inputStyle} value={languageStyle} onChange={(e) => setLanguageStyle(e.target.value)}><option>Storytelling</option><option>Persuasive</option><option>Informative</option></select></SelectWrapper>
                        </div>
                        <div>
                            <label htmlFor="audience" className={labelStyle}>{uiText.targetAudience}</label>
                            <SelectWrapper><select id="audience" className={inputStyle} value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}>{audienceOptions[uiText.language === 'id' ? 'id' : 'en'].map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></SelectWrapper>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="hook-type" className={labelStyle}>{uiText.hookType}</label>
                        <SelectWrapper><select id="hook-type" className={inputStyle} value={hookType} onChange={(e) => setHookType(e.target.value)}>{hookOptions[uiText.language === 'id' ? 'id' : 'en'].map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></SelectWrapper>
                    </div>
                    {contentType === 'single' ? (
                        <div>
                            <label htmlFor="count" className={labelStyle}>{uiText.numberOfScripts}</label>
                            <SelectWrapper><select id="count" className={inputStyle} value={scriptCount} onChange={(e) => setScriptCount(parseInt(e.target.value))}><option>1</option><option>2</option><option>3</option></select></SelectWrapper>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="slide-count" className={labelStyle}>{uiText.numberOfSlides}</label>
                            <SelectWrapper><select id="slide-count" className={inputStyle} value={carouselSlideCount} onChange={(e) => setCarouselSlideCount(parseInt(e.target.value))}><option>2</option><option>3</option><option>4</option><option>5</option></select></SelectWrapper>
                        </div>
                    )}
                </div>
            </div>
             <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <button onClick={onGenerate} disabled={isLoading} className="w-full flex items-center justify-center gap-3 bg-custom-teal hover:bg-custom-teal-dark text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:bg-teal-400 disabled:cursor-not-allowed disabled:transform-none">
                        {isLoading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>{uiText.generatingButton}</span></>) : (<><Bot className="w-5 h-5" /><span>{uiText.generateButton}</span></>)}
                    </button>
                    {generatedContent.length > 0 && !isLoading && (
                        <button onClick={onReset} className="p-3 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 rounded-lg shadow-md transition-colors"><RotateCcw className="w-5 h-5" /></button>
                    )}
                </div>
                {generatedContent.length > 0 && (
                     <div className="flex flex-col sm:flex-row items-center gap-3">
                        <button onClick={handlePdfDownload} className="w-full flex items-center justify-center gap-2 bg-rose-100 hover:bg-rose-200/80 text-rose-600 font-semibold py-2.5 px-4 rounded-lg transition-colors">
                            <FileDown className="w-4 h-4" />{uiText.saveAsPdf}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputForm;