import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result) {
            // Redirect to appropriate dashboard
            const currentRole = result.role;
            if (currentRole === 'super-admin') navigate('/super-admin/dashboard');
            else if (currentRole === 'company-admin') navigate('/company-admin/dashboard');
            else if (currentRole === 'company-user') navigate('/company-user/dashboard');
            else if (currentRole === 'college-admin') navigate('/college-admin/dashboard');
            else if (currentRole === 'college-user') navigate('/college-user/dashboard');
        } else {
            setError('Invalid email or password.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050b14] flex flex-col justify-center items-center p-4 relative overflow-hidden text-white font-sans selection:bg-blue-500/30">
            {/* Back to Home Button */}
            <Link to="/" className="absolute top-6 lg:top-8 left-6 lg:left-8 z-20 flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-md font-medium text-sm shadow-lg">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050b14] via-transparent to-[#050b14]"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/20 blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/20 blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        G
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
                <p className="text-slate-400 text-center mb-8">Sign in to access your dashboard</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 px-[1px]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder:text-slate-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-slate-300">Password</label>
                            <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 px-[1px]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder:text-slate-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-3.5 text-base font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] mt-2" disabled={loading}>
                        {loading ? 'Processing...' : 'Sign In'}
                    </Button>
                </form>
            </div>

            {/* Development Tip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl w-full px-4 z-10">
                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl text-xs text-slate-400 flex flex-col items-center">
                    <span className="text-blue-400 font-bold mb-1">Demo Logins (Password for all: 123456):</span>
                    <div className="flex gap-4">
                        <div className="text-right">
                            • superadmin@gotek.com<br />
                            • companyadmin@gotek.com<br />
                            • companyuser@gotek.com
                        </div>
                        <div className="text-left">
                            • collegeadmin@gotek.com<br />
                            • collegeuser@gotek.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
