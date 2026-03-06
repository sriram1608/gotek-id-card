import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

import { cn } from '../../lib/utils';
import { Edit3, Mail, BookOpen, Clock, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export function CollegeUserOverview() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className={cn("text-2xl font-bold tracking-tight", "text-slate-900")}>
                    Student Portal
                </h1>
                <p className={cn("text-sm mt-1", "text-slate-500")}>
                    View your student profile and access your digital ID card.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Col - Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-3xl font-bold shrink-0 shadow-lg">
                                {user?.name.charAt(0)}
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className={cn("text-2xl font-bold", "text-slate-900")}>{user?.name}</h2>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <Badge variant="warning">Undergraduate Student</Badge>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" icon={<Edit3 className="w-4 h-4" />}>
                                        Request Update
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            <div className="space-y-4">
                                <h3 className={cn("text-sm font-semibold uppercase tracking-wider", "text-slate-400")}>Academic Details</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <BookOpen className={cn("w-4 h-4", "text-slate-500")} />
                                        <div>
                                            <p className={cn("text-xs text-slate-500")}>Course / Major</p>
                                            <span className={cn("font-medium", "text-slate-700")}>B.S. Computer Science</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Clock className={cn("w-4 h-4", "text-slate-500")} />
                                        <div>
                                            <p className={cn("text-xs text-slate-500")}>Enrollment Year</p>
                                            <span className={cn("font-medium", "text-slate-700")}>Freshman - Class of 2028</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className={cn("w-4 h-4", "text-slate-500")} />
                                        <div>
                                            <p className={cn("text-xs text-slate-500")}>ID Valid Until</p>
                                            <span className={cn("font-medium text-emerald-500")}>May 2025 (Renewable)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className={cn("text-sm font-semibold uppercase tracking-wider", "text-slate-400")}>Contact Details</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className={cn("w-4 h-4", "text-slate-500")} />
                                        <div>
                                            <p className={cn("text-xs text-slate-500")}>University Email</p>
                                            <span className={cn("font-medium", "text-slate-700")}>{user?.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className={cn("w-4 h-4 border-2 rounded-full", "border-slate-500")} />
                                        <div>
                                            <p className={cn("text-xs text-slate-500")}>Student ID Number</p>
                                            <span className={cn("font-mono font-medium", "text-slate-700")}>STU-24-9182</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cn("mt-8 p-4 rounded-xl border", "bg-amber-50 border-amber-200")}>
                            <h3 className={cn("text-sm font-semibold text-amber-600 dark:text-amber-500 mb-2")}>Campus Access Status</h3>
                            <p className={cn("text-sm", "text-amber-700/80")}>
                                Your digital student ID grants you access to the Main Library, Science Building Labs, and South Campus Dormitories. Ensure your app is updated to use NFC scanning.
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Right Col - ID Card Preview */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="flex flex-col items-center">
                        <h2 className={cn("text-sm justify-self-start self-start font-semibold mb-6", "text-slate-900")}>Digital Student Card</h2>

                        {/* The ID Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-64 h-[400px] rounded-2xl bg-white shadow-xl overflow-hidden relative border border-slate-200 isolation-auto"
                        >
                            {/* Card Header Background */}
                            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-br from-amber-600 to-orange-700 clip-path-slant z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)' }}></div>

                            <div className="relative z-10 flex flex-col items-center pt-6 px-6 pb-6 h-full text-center">
                                <div className="text-white font-bold tracking-wider mb-6 pb-2 w-full text-sm">STATE UNIVERSITY</div>

                                <div className="w-28 h-28 rounded-lg bg-white border-4 border-white shadow-xl flex items-center justify-center text-5xl font-bold text-slate-700 mb-4 overflow-hidden -rotate-2">
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center rotate-2">
                                        {user?.name.charAt(0)}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-0.5 mt-2 uppercase">{user?.name}</h3>
                                <p className="text-sm font-medium text-amber-600 mb-4 tracking-wider">UNDERGRADUATE</p>

                                <div className="mt-auto w-full grid grid-cols-2 gap-2 text-left mb-4 border-t border-slate-200 pt-3">
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Student ID</p>
                                        <p className="text-xs font-mono font-bold text-slate-800">STU-24-9182</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Valid Thru</p>
                                        <p className="text-xs font-mono font-bold text-slate-800">05/2025</p>
                                    </div>
                                </div>

                                {/* Mock QR/Barcode */}
                                <div className="w-full h-12 bg-slate-100 rounded-lg flex items-center justify-center p-2 mb-1">
                                    <span className="text-[10px] text-slate-400 tracking-[0.2em] font-mono">|| || | || ||| | |||</span>
                                </div>
                            </div>
                        </motion.div>

                    </Card>
                </div>
            </div>
        </div>
    );
}
