import React, { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

interface BadgeProps {
    children: ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return isDark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border-emerald-200";
            case 'warning':
                return isDark ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-amber-50 text-amber-700 border-amber-200";
            case 'error':
                return isDark ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-red-50 text-red-700 border-red-200";
            case 'info':
                return isDark ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-200";
            default:
                return isDark ? "bg-slate-500/10 text-slate-300 border-slate-500/20" : "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium border",
            getVariantStyles(),
            className
        )}>
            {children}
        </span>
    );
}
