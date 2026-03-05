import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Workflow', href: '/#workflow' },
    { label: 'Pricing', href: '/#pricing' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md",
      isDark
        ? "bg-[#0a192f]/80 border-white/10"
        : "bg-white/80 border-slate-200",
      isMobileMenuOpen ? "bg-[#0a192f] dark:bg-[#0a192f] bg-white" : ""
    )}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold tracking-tight">
            G
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            isDark ? "text-white" : "text-slate-900"
          )}>
            Gotek
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-500",
                isDark ? "text-slate-300" : "text-slate-600"
              )}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/templates"
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-500",
              isDark ? "text-slate-300" : "text-slate-600"
            )}
          >
            Templates
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link to="/login" className={cn(
            "hidden md:flex px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg items-center justify-center",
            isDark
              ? "bg-white text-blue-900 hover:bg-blue-50"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}>
            Login
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen
              ? <X className={cn("w-6 h-6", isDark ? "text-white" : "text-slate-900")} />
              : <Menu className={cn("w-6 h-6", isDark ? "text-white" : "text-slate-900")} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={cn(
          "md:hidden absolute top-20 left-0 right-0 border-b shadow-2xl animate-in slide-in-from-top-2",
          isDark ? "bg-[#0a192f] border-white/10" : "bg-white border-slate-200"
        )}>
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-medium px-4 py-3 rounded-xl transition-colors",
                  isDark ? "text-slate-300 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/templates"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg font-medium px-4 py-3 rounded-xl transition-colors",
                isDark ? "text-slate-300 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              Templates
            </Link>
            <div className="pt-4 mt-2 px-2 border-t border-inherit">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={cn(
                "w-full flex py-3.5 rounded-xl text-base font-bold transition-all justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]",
                isDark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}>
                Login to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
