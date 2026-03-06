import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={cn(
              "inline-block py-1 px-3 rounded-full text-sm font-medium mb-6 border",
              "bg-blue-100 border-blue-200 text-blue-700"
            )}>
              Next-Gen ID Card Management
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              "text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight",
              "text-slate-900"
            )}
          >
            Design, Manage & Issue <br />
            <span className={cn(
              "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
            )}>
              Smart ID Cards
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "text-xl mb-10 max-w-2xl",
              "text-slate-600"
            )}
          >
            The complete platform for schools, corporations, and events.
            Streamline your identity management with our automated workflow from design to dispatch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/login" className={cn(
              "px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]",
              "bg-blue-600 hover:bg-blue-700 text-white"
            )}>
              Login Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/templates" className={cn(
              "px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 border backdrop-blur-sm",
              "border-slate-300 hover:bg-slate-50 text-slate-700"
            )}>
              View Templates
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex gap-8 text-sm font-medium opacity-70"
          >
            <div className={cn("flex items-center gap-2", "text-slate-600")}>
              <CheckCircle2 className="w-5 h-5 text-green-500" /> No Credit Card Required
            </div>
            <div className={cn("flex items-center gap-2", "text-slate-600")}>
              <ShieldCheck className="w-5 h-5 text-blue-500" /> Enterprise Security
            </div>
            <div className={cn("flex items-center gap-2", "text-slate-600")}>
              <Zap className="w-5 h-5 text-yellow-500" /> Instant Preview
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
