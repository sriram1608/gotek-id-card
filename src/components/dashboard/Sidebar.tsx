import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Building2, Users, Settings, LayoutDashboard,
    CreditCard, Activity, FileStack, Shield,
    GraduationCap, Briefcase
} from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
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
                { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/super/overview' },
                { icon: Building2, label: 'Organizations', path: '/dashboard/super/organizations' },
                { icon: Briefcase, label: 'Company Admins', path: '/dashboard/super/company-admins' },
                { icon: GraduationCap, label: 'College Admins', path: '/dashboard/super/college-admins' },
                { icon: Activity, label: 'System Analytics', path: '/dashboard/super/analytics' },
                { icon: Settings, label: 'Settings', path: '/dashboard/super/settings' },
            ];
        case 'company-admin':
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/company-admin/overview' },
                { icon: Users, label: 'Company Users', path: '/dashboard/company-admin/users' },
                { icon: CreditCard, label: 'ID Generation', path: '/dashboard/company-admin/id-generation' },
                { icon: Activity, label: 'Activity Logs', path: '/dashboard/company-admin/activity' },
                { icon: Settings, label: 'Settings', path: '/dashboard/company-admin/settings' },
            ];
        case 'company-user':
            return [
                { icon: LayoutDashboard, label: 'My Profile', path: '/dashboard/company-user/profile' },
                { icon: CreditCard, label: 'My ID Card', path: '/dashboard/company-user/id-card' },
                { icon: Settings, label: 'Settings', path: '/dashboard/company-user/settings' },
            ];
        case 'college-admin':
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/college-admin/overview' },
                { icon: Users, label: 'Students & Staff', path: '/dashboard/college-admin/users' },
                { icon: FileStack, label: 'ID Templates', path: '/dashboard/college-admin/templates' },
                { icon: CreditCard, label: 'Batch Generation', path: '/dashboard/college-admin/batch-generation' },
                { icon: Settings, label: 'Settings', path: '/dashboard/college-admin/settings' },
            ];
        case 'college-user':
            return [
                { icon: LayoutDashboard, label: 'My Details', path: '/dashboard/college-user/profile' },
                { icon: CreditCard, label: 'My ID', path: '/dashboard/college-user/id-card' },
                { icon: Settings, label: 'Settings', path: '/dashboard/college-user/settings' },
            ];
        default:
            return [];
    }
};

export function Sidebar() {
    const { role, user } = useAuth();
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const navItems = getNavItems(role);

    return (
        <aside className={cn(
            "w-64 border-r flex flex-col transition-colors duration-300",
            isDark ? "bg-[#0b1120]/95 border-white/10" : "bg-white border-slate-200"
        )}>
            <div className="h-16 flex items-center px-6 border-b border-inherit">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                        G
                    </div>
                    <span className={cn("text-xl font-bold", isDark ? "text-white" : "text-slate-900")}>
                        Gotek SaaS
                    </span>
                </div>
            </div>

            <div className="p-4 pt-6 flex-1 overflow-y-auto">
                <div className="mb-6 px-3">
                    <p className={cn("text-xs font-semibold uppercase tracking-wider", isDark ? "text-slate-500" : "text-slate-400")}>
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
                                    ? (isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600")
                                    : (isDark
                                        ? "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100")
                            )}
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
                    isDark ? "bg-white/5" : "bg-slate-50"
                )}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shrink-0">
                        {user?.name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium truncate", isDark ? "text-white" : "text-slate-900")}>
                            {user?.name}
                        </p>
                        <p className={cn("text-xs truncate", isDark ? "text-slate-400" : "text-slate-500")}>
                            {user?.organization || 'Gotek Inc.'}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
