import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

const NotificationModal = ({ message, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto-close after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <div className={`fixed top-5 right-5 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-green-500 text-white font-bold rounded-lg shadow-lg p-4 flex items-center gap-3">
                <Check className="w-6 h-6" />
                <span>{message}</span>
            </div>
        </div>
    );
};

export default NotificationModal;