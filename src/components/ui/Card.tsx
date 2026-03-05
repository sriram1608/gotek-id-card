import React, { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    noPadding?: boolean;
    className?: string;
    key?: string | number;
}

export function Card({ children, className, noPadding = false, ...props }: CardProps) {
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    return (
        <div className={cn(
            "rounded-xl border shadow-sm transition-colors duration-300 overflow-hidden",
            isDark ? "bg-[#131b2f] border-white/10 shadow-black/20" : "bg-white border-slate-200 shadow-slate-100",
            !noPadding && "p-6",
            className
        )} {...props}>
            {children}
        </div>
    );
}
