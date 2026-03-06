import React, { ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    noPadding?: boolean;
    className?: string;
    key?: string | number;
}

export function Card({ children, className, noPadding = false, ...props }: CardProps) {

    return (
        <div className={cn(
            "rounded-xl border shadow-sm transition-colors duration-300 overflow-hidden",
            "bg-white border-slate-200 shadow-slate-100",
            !noPadding && "p-6",
            className
        )} {...props}>
            {children}
        </div>
    );
}
