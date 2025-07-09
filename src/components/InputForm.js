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
        setTargetAudience, generatedContent, contentType, setContentType
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
        const pdf = new jsPDF();
        if (contentType === 'single') {
            const textContent = generatedContent.map(s => `Title: ${s.title}\n\nProblem Call-Out:\n${s.problem}\n\nStorytelling Body:\n${s.story}\n\nCall To Action:\n${s.cta}`).join('\n\n\n');
            const lines = pdf.splitTextToSize(textContent, 180);
            pdf.text(lines, 10, 10);
        } else {
            generatedContent.forEach((slide, index) => {
                if (index > 0) pdf.addPage();
                pdf.setFillColor(241, 245, 249);
                pdf.roundedRect(10, 10, 190, 277, 5, 5, 'F');
                pdf.setTextColor(15, 23, 42);
                pdf.setFontSize(10);
                pdf.text(`Slide ${slide.slide_number || (index + 1)}`, 20, 25);
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(18);
                const titleLines = pdf.splitTextToSize(slide.title, 170);
                pdf.text(titleLines, 20, 35);
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(12);
                const contentLines = pdf.splitTextToSize(slide.content, 170);
                pdf.text(contentLines, 20, 50);
            });
        }
        pdf.save('anotechhub_scripts.pdf');
        openThankYouModal();
    };

    const handleDocxDownload = () => {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        const footer = "</body></html>";
        let content = '';
        if (contentType === 'single') {
            generatedContent.forEach(s => {
                content += `<h2>${s.title}</h2><h3>Problem Call-Out</h3><p>${s.problem}</p><h3>Storytelling Body</h3><p>${s.story}</p><h3>Call To Action</h3><p>${s.cta}</p><br/>`;
            });
        } else {
            generatedContent.forEach((s, index) => {
                content += `<h2>Slide ${s.slide_number || (index + 1)}: ${s.title}</h2><p>${s.content.replace(/\n/g, '<br />')}</p><br/><hr/><br/>`;
            });
        }
        const sourceHTML = header + content + footer;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'anotechhub_scripts.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
        openThankYouModal();
    };

    return (
        <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Content Type</label>
                        <div className="flex gap-2 rounded-lg bg-gray-200/80 dark:bg-slate-900/80 p-1">
                            <button onClick={() => setContentType('single')} className={`w-full p-2 rounded-md text-sm font-semibold transition-all ${contentType === 'single' ? 'bg-white dark:bg-slate-700 shadow' : 'text-gray-500'}`}>Single Post</button>
                            <button onClick={() => setContentType('carousel')} className={`w-full p-2 rounded-md text-sm font-semibold transition-all ${contentType === 'carousel' ? 'bg-white dark:bg-slate-700 shadow' : 'text-gray-500'}`}>Carousel</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="product-name" className={labelStyle}>Product Name</label>
                        <input type="text" id="product-name" className={inputStyle} placeholder="e.g., AnoTech Ergonomic Chair" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="product-desc" className={labelStyle}>Product Description</label>
                        <textarea id="product-desc" rows="4" className={inputStyle} placeholder="Explain the main features, advantages, and benefits of your product..." value={productDesc} onChange={(e) => setProductDesc(e.target.value)}></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="style" className={labelStyle}>Language Style</label>
                            <SelectWrapper><select id="style" className={inputStyle} value={languageStyle} onChange={(e) => setLanguageStyle(e.target.value)}><option>Storytelling</option><option>Persuasive</option><option>Informative</option></select></SelectWrapper>
                        </div>
                        <div>
                            <label htmlFor="audience" className={labelStyle}>Target Audience</label>
                            <SelectWrapper><select id="audience" className={inputStyle} value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}><option>Teenagers</option><option>Adults</option><option>Parents</option><option>General</option></select></SelectWrapper>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="hook-type" className={labelStyle}>Hook Type</label>
                        <SelectWrapper><select id="hook-type" className={inputStyle} value={hookType} onChange={(e) => setHookType(e.target.value)}>{hookOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></SelectWrapper>
                    </div>
                    {contentType === 'single' ? (
                        <div>
                            <label htmlFor="count" className={labelStyle}>Number of Scripts</label>
                            <SelectWrapper><select id="count" className={inputStyle} value={scriptCount} onChange={(e) => setScriptCount(parseInt(e.target.value))}><option>1</option><option>2</option><option>3</option></select></SelectWrapper>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="slide-count" className={labelStyle}>Number of Slides</label>
                            <SelectWrapper><select id="slide-count" className={inputStyle} value={carouselSlideCount} onChange={(e) => setCarouselSlideCount(parseInt(e.target.value))}><option>2</option><option>3</option><option>4</option><option>5</option></select></SelectWrapper>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-2">
                <button onClick={onGenerate} disabled={isLoading} className="w-full flex items-center justify-center gap-3 bg-custom-teal hover:bg-custom-teal-dark text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:bg-teal-400 disabled:cursor-not-allowed disabled:transform-none">
                    {isLoading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Generating...</span></>) : (<><Bot className="w-5 h-5" /><span>Generate Script with AI</span></>)}
                </button>
                {generatedContent.length > 0 && !isLoading && (
                    <button onClick={onReset} className="p-3 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 rounded-lg shadow-md transition-colors"><RotateCcw className="w-5 h-5" /></button>
                )}
            </div>
            {generatedContent.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button onClick={handlePdfDownload} className="w-full flex items-center justify-center gap-2 bg-rose-100 hover:bg-rose-200/80 text-rose-600 font-semibold py-2.5 px-4 rounded-lg transition-colors"><FileDown className="w-4 h-4" />Save as PDF</button>
                    <button onClick={handleDocxDownload} className="w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200/80 text-blue-700 font-semibold py-2.5 px-4 rounded-lg transition-colors"><FileDown className="w-4 h-4" />Download as .docx</button>
                </div>
            )}
        </div>
    );
};

export default InputForm;