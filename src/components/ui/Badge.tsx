import React, { ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface BadgeProps {
    children: ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {

    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case 'warning':
                return "bg-amber-50 text-amber-700 border-amber-200";
            case 'error':
                return "bg-red-50 text-red-700 border-red-200";
            case 'info':
                return "bg-blue-50 text-blue-700 border-blue-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
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
