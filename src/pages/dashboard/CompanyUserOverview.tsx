import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

import { cn } from '../../lib/utils';
import { Download, RefreshCw, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export function CompanyUserOverview() {
    const { user } = useAuth();

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className={cn("text-2xl font-bold tracking-tight", "text-slate-900")}>
                    My Dashboard
                </h1>
                <p className={cn("text-sm mt-1", "text-slate-500")}>
                    View your profile and manage your digital identity card.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Col - Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold font-serif shrink-0 shadow-lg">
                                {user?.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className={cn("text-2xl font-bold", "text-slate-900")}>{user?.name}</h2>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <Badge variant="info">Software Engineer</Badge>
                                    <p className={cn("text-sm font-medium", "text-slate-500")}>Engineering Dept</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className={cn("text-sm font-semibold uppercase tracking-wider", "text-slate-400")}>Contact Details</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className={cn("w-4 h-4", "text-slate-500")} />
                                        <span className={cn("text-slate-700")}>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className={cn("w-4 h-4", "text-slate-500")} />
                                        <span className={cn("text-slate-700")}>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin className={cn("w-4 h-4", "text-slate-500")} />
                                        <span className={cn("text-slate-700")}>San Francisco, CA</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className={cn("text-sm font-semibold uppercase tracking-wider", "text-slate-400")}>Work Details</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Briefcase className={cn("w-4 h-4", "text-slate-500")} />
                                        <span className={cn("text-slate-700")}>Employee ID: <span className="font-mono">TC-2094</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className={cn("w-4 h-4 rounded-full border-2", "border-slate-500")} />
                                        <span className={cn("text-slate-700")}>Full-time</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className={cn("w-4 h-4 rounded-full border-2", "border-slate-500")} />
                                        <span className={cn("text-slate-700")}>Joined: Jan 15, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h2 className={cn("text-lg font-semibold mb-4", "text-slate-900")}>Card Requests History</h2>
                        <div className="space-y-4">
                            <div className={cn("p-4 rounded-lg border flex items-center justify-between", "bg-slate-50 border-slate-200")}>
                                <div>
                                    <p className={cn("text-sm font-medium", "text-slate-800")}>Initial Issue</p>
                                    <p className={cn("text-xs mt-0.5", "text-slate-500")}>Jan 15, 2023</p>
                                </div>
                                <Badge variant="success">Completed</Badge>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Col - ID Card Preview */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="flex flex-col items-center">
                        <h2 className={cn("text-sm justify-self-start self-start font-semibold mb-6", "text-slate-900")}>Virtual ID Card</h2>

                        {/* The ID Card */}
                        <motion.div
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="w-64 h-[400px] rounded-2xl bg-white shadow-xl overflow-hidden relative border border-slate-200"
                        >
                            {/* Card Header Background */}
                            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-blue-600 to-indigo-700"></div>

                            <div className="relative z-10 flex flex-col items-center pt-6 px-6 pb-6 h-full text-center">
                                <div className="text-white font-bold tracking-wider mb-6 pb-2 border-b border-white/30 w-full">TECHCORP</div>

                                <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-slate-700 mb-4 overflow-hidden">
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                        {user?.name.charAt(0)}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-1">{user?.name}</h3>
                                <p className="text-sm font-medium text-blue-600 mb-4">Software Engineer</p>

                                <div className="mt-auto w-full grid grid-cols-2 gap-2 text-left mb-4">
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Emp ID</p>
                                        <p className="text-xs font-mono font-medium text-slate-700">TC-2094</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Blood Group</p>
                                        <p className="text-xs font-mono font-medium text-slate-700">O+</p>
                                    </div>
                                </div>

                                {/* Mock Barcode */}
                                <div className="w-full h-10 mt-2 opacity-80 flex gap-0.5 justify-center">
                                    {[...Array(40)].map((_, i) => (
                                        <div key={i} className={`h-full bg-slate-800 ${Math.random() > 0.5 ? 'w-0.5' : Math.random() > 0.5 ? 'w-1' : 'w-1.5'}`} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <div className="w-full flex flex-col gap-3 mt-8">
                            <Button icon={<Download className="w-4 h-4" />} className="w-full justify-center">
                                Download PDF
                            </Button>
                            <Button variant="outline" icon={<RefreshCw className="w-4 h-4" />} className="w-full justify-center">
                                Request Update
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
