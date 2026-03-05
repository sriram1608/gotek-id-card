import { Bell, Search, Menu, UserCircle, ChevronDown, LogOut } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const { user, loginAs, logout } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

    const roles: { id: UserRole, label: string }[] = [
        { id: 'super-admin', label: 'Super Admin' },
        { id: 'company-admin', label: 'Company Admin' },
        { id: 'company-user', label: 'Company User' },
        { id: 'college-admin', label: 'College Admin' },
        { id: 'college-user', label: 'College User' }
    ];

    const handleRoleSwitch = (r: UserRole) => {
        loginAs(r);
        setShowRoleSwitcher(false);

        // Redirect to default route for that role
        if (r === 'super-admin') navigate('/dashboard/super/overview');
        else if (r === 'company-admin') navigate('/dashboard/company-admin/overview');
        else if (r === 'company-user') navigate('/dashboard/company-user/profile');
        else if (r === 'college-admin') navigate('/dashboard/college-admin/overview');
        else if (r === 'college-user') navigate('/dashboard/college-user/profile');
    };

    return (
        <header className={cn(
            "h-16 flex items-center justify-between px-6 border-b z-20 transition-colors duration-300 backdrop-blur-md",
            isDark ? "bg-[#0b1120]/80 border-white/10" : "bg-white/80 border-slate-200"
        )}>
            {/* Search Bar */}
            <div className="flex-1 flex flex-row items-center gap-4">
                <button className="md:hidden">
                    <Menu className={cn("w-5 h-5", isDark ? "text-slate-400" : "text-slate-600")} />
                </button>
                <div className="relative max-w-md w-full hidden sm:block">
                    <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4", isDark ? "text-slate-500" : "text-slate-400")} />
                    <input
                        type="text"
                        placeholder="Search Gotek system..."
                        className={cn(
                            "w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all",
                            isDark
                                ? "bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder:text-slate-500"
                                : "bg-slate-100/50 border border-slate-200 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                        )}
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                <button className={cn(
                    "p-2 rounded-full relative transition-colors",
                    isDark ? "hover:bg-white/10 text-slate-400" : "hover:bg-slate-100 text-slate-600"
                )}>
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0b1120]"></span>
                </button>

                {/* Demo Role Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                        className={cn(
                            "flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all",
                            isDark ? "border-white/10 hover:bg-white/5" : "border-slate-200 hover:bg-slate-50"
                        )}
                    >
                        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            {user?.name.charAt(0)}
                        </div>
                        <span className={cn("text-sm font-medium hidden md:block", isDark ? "text-slate-200" : "text-slate-700")}>
                            {user?.name}
                        </span>
                        <ChevronDown className={cn("w-4 h-4", isDark ? "text-slate-400" : "text-slate-500")} />
                    </button>

                    {showRoleSwitcher && (
                        <div className={cn(
                            "absolute top-full right-0 mt-2 w-56 rounded-xl shadow-xl border py-1 z-50",
                            isDark ? "bg-[#1a2333] border-white/10 shadow-black/50" : "bg-white border-slate-200 shadow-slate-200/50"
                        )}>
                            <div className="px-4 py-2 border-b border-inherit mb-1">
                                <p className={cn("text-xs font-semibold uppercase tracking-wider", isDark ? "text-slate-500" : "text-slate-400")}>Switch Role (Demo)</p>
                            </div>
                            {roles.map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => handleRoleSwitch(r.id)}
                                    className={cn(
                                        "w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors",
                                        user?.role === r.id
                                            ? (isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600")
                                            : (isDark ? "text-slate-300 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50")
                                    )}
                                >
                                    <UserCircle className="w-4 h-4" />
                                    {r.label}
                                </button>
                            ))}
                            <div className="border-t border-inherit mt-1 px-2 pt-1 pb-1">
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate('/');
                                    }}
                                    className={cn(
                                        "w-full text-left px-2 py-2 text-sm flex items-center gap-2 rounded-md transition-colors text-red-500",
                                        isDark ? "hover:bg-red-500/10" : "hover:bg-red-50"
                                    )}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
