import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Building2, Users, Settings, LayoutDashboard,
    CreditCard, Activity, FileStack, Shield,
    GraduationCap, Briefcase, FileText, UserCircle, X
} from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

import { cn } from '../../lib/utils';

interface NavItem {
    icon: React.ElementType;
    label: string;
    path: string;
}

const getNavItems = (role: UserRole | null): NavItem[] => {
    switch (role) {
        case 'super-admin':
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/super-admin/dashboard' },
                { icon: Building2, label: 'Organizations', path: '/super-admin/organizations' },
                { icon: Briefcase, label: 'Company Admins', path: '/super-admin/company-admins' },
                { icon: GraduationCap, label: 'College Admins', path: '/super-admin/college-admins' },
                { icon: Activity, label: 'Analytics', path: '/super-admin/analytics' },
                { icon: Settings, label: 'Settings', path: '/super-admin/settings' },
            ];
        case 'company-admin':
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/company-admin/dashboard' },
                { icon: Users, label: 'Company Users', path: '/company-admin/users' },
                { icon: FileStack, label: 'Templates', path: '/templates' },
                { icon: CreditCard, label: 'ID Cards', path: '/company-admin/id-cards' },
                { icon: FileText, label: 'Reports', path: '/company-admin/reports' },
            ];
        case 'company-user':
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/company-user/dashboard' },
                { icon: UserCircle, label: 'My Profile', path: '/company-user/profile' },
                { icon: FileStack, label: 'Templates', path: '/templates' },
                { icon: CreditCard, label: 'My ID Card', path: '/company-user/id-card' },
            ];
        case 'college-admin':
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/college-admin/dashboard' },
                { icon: Users, label: 'College Users', path: '/college-admin/users' },
                { icon: FileStack, label: 'Templates (Preview Only)', path: '/templates' },
                { icon: CreditCard, label: 'ID Generation', path: '/college-admin/id-generation' },
            ];
        case 'college-user':
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/college-user/dashboard' },
                { icon: UserCircle, label: 'My Profile', path: '/college-user/profile' },
                { icon: FileStack, label: 'Templates (Preview Only)', path: '/templates' },
                { icon: CreditCard, label: 'My ID Card', path: '/college-user/id-card' },
            ];
        default:
            return [];
    }
};

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const { role, user } = useAuth();

    const navItems = getNavItems(role);

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 lg:w-64 border-r flex flex-col transition-transform duration-300 lg:static lg:translate-x-0",
            "bg-white border-slate-200 shadow-2xl lg:shadow-none",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className={cn(
                "h-16 flex items-center justify-between px-6 border-b border-inherit shrink-0"
            )}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                        G
                    </div>
                    <span className={cn("text-xl font-bold", "text-slate-900")}>
                        Gotek
                    </span>
                </div>
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className={cn(
                        "p-2 -mr-2 rounded-lg lg:hidden",
                        "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    )}
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="p-4 pt-6 flex-1 overflow-y-auto">
                <div className="mb-6 px-3">
                    <p className={cn("text-xs font-semibold uppercase tracking-wider", "text-slate-400")}>
                        {role?.replace('-', ' ')}
                    </p>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? ("bg-blue-50 text-blue-600")
                                    : ("text-slate-600 hover:text-slate-900 hover:bg-slate-100"),
                                "active:scale-95"
                            )}
                            onClick={() => {
                                // Close sidebar on mobile when navigating
                                if (window.innerWidth < 1024) {
                                    setIsOpen(false);
                                }
                            }}
                        >
                            <item.icon className={cn("w-5 h-5", "transition-colors")} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-inherit">
                <div className={cn(
                    "flex items-center gap-3 p-3 rounded-lg",
                    "bg-slate-50"
                )}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shrink-0">
                        {user?.name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium truncate", "text-slate-900")}>
                            {user?.name}
                        </p>
                        <p className={cn("text-xs truncate", "text-slate-500")}>
                            {user?.organization || 'Gotek Inc.'}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
