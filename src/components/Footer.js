import React from 'react';

const Footer = () => (
    <footer className="text-center p-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-800">
        <div className="flex justify-center items-center gap-4">
            <span>© {new Date().getFullYear()} AnotechHub</span>
            <a href="https://www.instagram.com/anotechhub/" target="_blank" rel="noopener noreferrer" className="hover:text-custom-teal transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </a>
            <a href="https://www.threads.net/@anotechhub" target="_blank" rel="noopener noreferrer" className="hover:text-custom-teal transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9.5c-2.8 0-5 2.5-5 5.5s2.2 5.5 5 5.5 5-2.5 5-5.5-2.2-5.5-5-5.5z"></path>
                    <path d="M21 9.5c0 1.6-.6 3-1.6 4"></path>
                    <path d="M3 9.5c0 1.6.6 3 1.6 4"></path>
                </svg>
            </a>
        </div>
    </footer>
);

export default Footer;