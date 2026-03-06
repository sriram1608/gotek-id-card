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
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden text-slate-900 font-sans selection:bg-blue-500/30">
            {/* Back to Home Button */}
            <Link to="/" className="absolute top-6 lg:top-8 left-6 lg:left-8 z-20 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white hover:bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 shadow-sm font-medium text-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>

                {/* Subtle curves/blobs */}
                <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full border-[60px] border-blue-100/50 blur-3xl opacity-60"></div>
                <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-blue-50/80 blur-3xl opacity-80"></div>
            </div>

            <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20">
                        G
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-slate-500 text-center mb-8">Sign in to access your dashboard</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 px-[1px]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-slate-700">Password</label>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 px-[1px]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-3.5 text-base font-bold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 mt-4 transition-all" disabled={loading}>
                        {loading ? 'Processing...' : 'Sign In'}
                    </Button>
                </form>
            </div>

            {/* Development Tip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl w-full px-4 z-10">
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-4 rounded-xl text-xs text-slate-600 flex flex-col items-center shadow-lg">
                    <span className="text-blue-600 font-bold mb-2">Demo Logins (Password for all: 123456):</span>
                    <div className="flex gap-8">
                        <div className="text-right space-y-1">
                            <p>• <span className="font-medium text-slate-800">superadmin@gotek.com</span></p>
                            <p>• <span className="font-medium text-slate-800">companyadmin@gotek.com</span></p>
                            <p>• <span className="font-medium text-slate-800">companyuser@gotek.com</span></p>
                        </div>
                        <div className="text-left space-y-1">
                            <p>• <span className="font-medium text-slate-800">collegeadmin@gotek.com</span></p>
                            <p>• <span className="font-medium text-slate-800">collegeuser@gotek.com</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
