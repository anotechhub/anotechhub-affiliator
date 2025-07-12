import React from 'react';
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

    const hookOptions = [
        "Problem/Agitate/Solve", "Before & After", "Story Hook", "Question Hook",
        "Contrarian Hook", "Secret Hook", "Statistic Hook", "Objection Hook",
        "Testimonial Hook", "How-To Hook"
    ];

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
            return (lines.length * options.size * 1.2); // Estimate height
        };

        let yPos = 40;

        generatedContent.forEach((item, index) => {
            if (index > 0 && contentType === 'single') {
                yPos += 40; // Add space between scripts
            }
            if (yPos > 780) { // Check for page break
                pdf.addPage();
                yPos = 40;
            }

            if (contentType === 'single') {
                yPos += addStyledText(item.title, 40, yPos, { size: 16, style: 'bold', color: '#01a1a8' });
                yPos += 15;
                
                pdf.setDrawColor('#fecaca'); pdf.setFillColor('#fef2f2');
                pdf.roundedRect(40, yPos, 515, 60, 3, 3, 'FD');
                addStyledText(uiText.problemCallout, 50, yPos + 15, { size: 10, style: 'bold', color: '#991b1b' });
                addStyledText(item.problem, 50, yPos + 30, { size: 10, color: '#374151', maxWidth: 495 });
                yPos += 75;

                addStyledText(uiText.storytellingBody, 40, yPos, { size: 10, style: 'bold' });
                yPos += 15;
                yPos += addStyledText(item.story, 40, yPos, { size: 10, color: '#374151' });
                yPos += 15;

                pdf.setDrawColor('#bbf7d0'); pdf.setFillColor('#f0fdf4');
                pdf.roundedRect(40, yPos, 515, 60, 3, 3, 'FD');
                addStyledText(uiText.callToAction, 50, yPos + 15, { size: 10, style: 'bold', color: '#166534' });
                addStyledText(item.cta, 50, yPos + 30, { size: 10, color: '#374151', maxWidth: 495 });
                yPos += 75;

            } else { // Carousel
                if (index > 0) pdf.addPage();
                
                pdf.setFillColor('#f1f5f9');
                pdf.rect(0, 0, 595, 842, 'F');
                pdf.setFillColor('#ffffff');
                pdf.roundedRect(40, 40, 515, 762, 10, 10, 'F');
                
                yPos = 80;
                addStyledText(`Slide ${item.slide_number}`, 60, yPos, { size: 12, style: 'bold', color: '#64748b' });
                yPos += 30;
                yPos += addStyledText(item.title, 60, yPos, { size: 22, style: 'bold', color: '#01a1a8', maxWidth: 480 });
                yPos += 15;
                pdf.setDrawColor('#e2e8f0');
                pdf.line(60, yPos, 535, yPos);
                yPos += 30;
                addStyledText(item.content, 60, yPos, { size: 12, color: '#374151', maxWidth: 480 });
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
                            <SelectWrapper><select id="audience" className={inputStyle} value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}><option>Teenagers</option><option>Adults</option><option>Parents</option><option>General</option></select></SelectWrapper>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="hook-type" className={labelStyle}>{uiText.hookType}</label>
                        <SelectWrapper><select id="hook-type" className={inputStyle} value={hookType} onChange={(e) => setHookType(e.target.value)}>{hookOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></SelectWrapper>
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