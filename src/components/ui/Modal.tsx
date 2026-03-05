import React, { ReactNode, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    maxWidth = 'md'
}: ModalProps) {
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const maxWidthClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Modal Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            "relative w-full rounded-2xl shadow-2xl flex flex-col my-auto z-10 overflow-hidden outline-none",
                            maxWidthClasses[maxWidth],
                            isDark ? "bg-[#131b2f] border border-white/10" : "bg-white border border-slate-200"
                        )}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Header */}
                        <div className={cn(
                            "flex items-center justify-between px-6 py-4 border-b",
                            isDark ? "border-white/10" : "border-slate-200"
                        )}>
                            <h3 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-slate-900")}>
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className={cn(
                                    "p-1.5 rounded-lg transition-colors",
                                    isDark ? "hover:bg-white/10 text-slate-400" : "hover:bg-slate-100 text-slate-500"
                                )}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className={cn(
                                "px-6 py-4 border-t flex justify-end gap-3",
                                isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"
                            )}>
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
