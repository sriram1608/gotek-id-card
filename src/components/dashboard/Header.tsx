import { Bell, Search, Menu, UserCircle, ChevronDown, LogOut } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

import { cn } from '../../lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className={cn(
            "h-16 flex items-center justify-between px-6 border-b z-20 transition-colors duration-300 backdrop-blur-md",
            "bg-white/80 border-slate-200"
        )}>
            {/* Search Bar */}
            <div className="flex-1 flex flex-row items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                    <Menu className={cn("w-5 h-5", "text-slate-600")} />
                </button>
                <div className="relative max-w-md w-full hidden sm:block">
                    <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4", "text-slate-400")} />
                    <input
                        type="text"
                        placeholder="Search Gotek system..."
                        className={cn(
                            "w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all",
                            "bg-slate-100/50 border border-slate-200 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                        )}
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                <button className={cn(
                    "p-2 rounded-full relative transition-colors",
                    "hover:bg-slate-100 text-slate-600"
                )}>
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0b1120]"></span>
                </button>

                {/* Profile Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className={cn(
                            "flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all",
                            "border-slate-200 hover:bg-slate-50"
                        )}
                    >
                        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold uppercase">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <span className={cn("text-sm font-medium hidden md:block", "text-slate-700")}>
                            {user?.name || 'User'}
                        </span>
                        <ChevronDown className={cn("w-4 h-4", "text-slate-500")} />
                    </button>

                    {showProfileMenu && (
                        <div className={cn(
                            "absolute top-full right-0 mt-2 w-56 rounded-xl shadow-xl border py-1 z-50",
                            "bg-white border-slate-200 shadow-slate-200/50"
                        )}>
                            <div className="px-4 py-3 border-b border-inherit mb-1 flex flex-col gap-0.5">
                                <p className={cn("text-sm font-semibold", "text-slate-900")}>{user?.name}</p>
                                <p className={cn("text-xs", "text-slate-500")}>{user?.email}</p>
                            </div>
                            <div className="border-t border-inherit mt-1 px-2 pt-1 pb-1">
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate('/');
                                    }}
                                    className={cn(
                                        "w-full text-left px-2 py-2 text-sm flex items-center gap-2 rounded-md transition-colors text-red-500",
                                        "hover:bg-red-50"
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
