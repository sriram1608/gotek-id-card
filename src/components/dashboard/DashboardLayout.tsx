import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { Building2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export function DashboardLayout() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div className={cn(
            "flex h-screen overflow-hidden",
            isDark ? "bg-[#0b1120] text-slate-100" : "bg-slate-50 text-slate-900"
        )}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                {/* Main scrollable area */}
                <main className={cn(
                    "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8",
                    isDark ? "bg-[#0b1120]" : "bg-slate-50"
                )}>
                    <div className="max-w-7xl mx-auto space-y-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
