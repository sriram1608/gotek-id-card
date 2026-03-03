import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md",
      isDark 
        ? "bg-[#0a192f]/80 border-white/10" 
        : "bg-white/80 border-slate-200"
    )}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
            ID
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            isDark ? "text-white" : "text-slate-900"
          )}>
            CardFlow
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Workflow', 'Pricing'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-500",
                isDark ? "text-slate-300" : "text-slate-600"
              )}
            >
              {item}
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

        <div className="flex items-center gap-4">
          <button className={cn(
            "hidden md:block text-sm font-medium transition-colors",
            isDark ? "text-white hover:text-blue-400" : "text-slate-900 hover:text-blue-600"
          )}>
            Login
          </button>
          <button className={cn(
            "px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg",
            isDark 
              ? "bg-white text-blue-900 hover:bg-blue-50" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
