import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { ShieldAlert, Building2, GraduationCap, Users } from 'lucide-react';

export function HierarchyTree() {
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className={cn(
            "p-8 rounded-xl border flex flex-col items-center overflow-x-auto",
            isDark ? "bg-[#131b2f] border-white/10" : "bg-white border-slate-200"
        )}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center max-w-4xl min-w-[600px] w-full"
            >
                {/* Super Admin Node */}
                <motion.div variants={itemVariants} className="flex flex-col items-center relative z-10">
                    <div className={cn(
                        "px-6 py-4 rounded-xl border shadow-lg flex items-center gap-4 w-64",
                        isDark ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30" : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
                    )}>
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <ShieldAlert className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <p className={cn("font-bold text-sm", isDark ? "text-purple-300" : "text-purple-900")}>Super Admin</p>
                            <p className={cn("text-xs", isDark ? "text-purple-400/70" : "text-purple-700/70")}>Gotek Platform</p>
                        </div>
                    </div>
                    {/* Connector Line down */}
                    <div className={cn("w-0.5 h-12", isDark ? "bg-slate-700" : "bg-slate-300")} />
                </motion.div>

                {/* Level 2 Container */}
                <div className="flex justify-between w-full relative">
                    {/* Horizontal connecting line */}
                    <div className={cn("absolute top-0 left-[25%] right-[25%] h-0.5", isDark ? "bg-slate-700" : "bg-slate-300")} />

                    {/* Company Branch */}
                    <div className="flex flex-col items-center w-1/2 relative">
                        <div className={cn("w-0.5 h-8 absolute top-0", isDark ? "bg-slate-700" : "bg-slate-300")} />
                        <motion.div variants={itemVariants} className="mt-8 relative z-10 w-64">
                            <div className={cn(
                                "px-6 py-4 rounded-xl border shadow flex items-center gap-4",
                                isDark ? "bg-[#1a2333] border-blue-500/30" : "bg-white border-blue-200"
                            )}>
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className={cn("font-bold text-sm", isDark ? "text-blue-300" : "text-blue-900")}>Company Admin</p>
                                    <p className={cn("text-xs", isDark ? "text-slate-400" : "text-slate-500")}>Organizations</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className={cn("w-0.5 h-10", isDark ? "bg-slate-700" : "bg-slate-300")} />

                        <motion.div variants={itemVariants} className="relative z-10 w-56">
                            <div className={cn(
                                "px-4 py-3 rounded-lg border flex items-center gap-3",
                                isDark ? "bg-[#0b1120] border-slate-700" : "bg-slate-50 border-slate-200"
                            )}>
                                <div className="w-8 h-8 rounded-full bg-slate-500/20 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                </div>
                                <div>
                                    <p className={cn("font-semibold text-xs", isDark ? "text-slate-300" : "text-slate-700")}>Company Users</p>
                                    <p className={cn("text-[10px]", isDark ? "text-slate-500" : "text-slate-500")}>Employees / Staff</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* College Branch */}
                    <div className="flex flex-col items-center w-1/2 relative">
                        <div className={cn("w-0.5 h-8 absolute top-0", isDark ? "bg-slate-700" : "bg-slate-300")} />
                        <motion.div variants={itemVariants} className="mt-8 relative z-10 w-64">
                            <div className={cn(
                                "px-6 py-4 rounded-xl border shadow flex items-center gap-4",
                                isDark ? "bg-[#1a2333] border-amber-500/30" : "bg-white border-amber-200"
                            )}>
                                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <p className={cn("font-bold text-sm", isDark ? "text-amber-300" : "text-amber-900")}>College Admin</p>
                                    <p className={cn("text-xs", isDark ? "text-slate-400" : "text-slate-500")}>Institutions</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className={cn("w-0.5 h-10", isDark ? "bg-slate-700" : "bg-slate-300")} />

                        <motion.div variants={itemVariants} className="relative z-10 w-56">
                            <div className={cn(
                                "px-4 py-3 rounded-lg border flex items-center gap-3",
                                isDark ? "bg-[#0b1120] border-slate-700" : "bg-slate-50 border-slate-200"
                            )}>
                                <div className="w-8 h-8 rounded-full bg-slate-500/20 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                </div>
                                <div>
                                    <p className={cn("font-semibold text-xs", isDark ? "text-slate-300" : "text-slate-700")}>College Users</p>
                                    <p className={cn("text-[10px]", isDark ? "text-slate-500" : "text-slate-500")}>Students / Staff</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
