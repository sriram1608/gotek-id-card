import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

export function DashboardLayout() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div className={cn(
            "flex h-screen overflow-hidden",
            isDark ? "bg-[#0b1120] text-slate-100" : "bg-slate-50 text-slate-900"
        )}>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <Header onToggleSidebar={() => setSidebarOpen(true)} />

                {/* Main scrollable area */}
                <main className={cn(
                    "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8",
                    isDark ? "bg-[#0b1120]" : "bg-slate-50"
                )}>
                    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
