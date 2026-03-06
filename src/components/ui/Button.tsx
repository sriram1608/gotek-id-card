import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children?: ReactNode;
    icon?: ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void) | any;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export function Button({
    variant = 'primary',
    size = 'md',
    className,
    children,
    icon,
    ...props
}: ButtonProps) {

    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    const variantStyles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white",
        secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-200",
        outline: "border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-slate-300",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200",
        ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
    };

    return (
        <button
            className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
            {...props}
        >
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
