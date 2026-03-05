import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableColumn } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { Users, FileStack, Zap, Plus, Search, CheckSquare, Image as ImageIcon } from 'lucide-react';

interface CollegeUser {
    id: string;
    name: string;
    role: 'Student' | 'Staff';
    courseOrDept: string;
    status: 'Active' | 'Pending' | 'Graduated';
    idGenerated: boolean;
}

const mockCollegeUsers: CollegeUser[] = [
    { id: 'STU-24-001', name: 'Alice Chen', role: 'Student', courseOrDept: 'Computer Science', status: 'Active', idGenerated: true },
    { id: 'STU-24-002', name: 'Bob Smith', role: 'Student', courseOrDept: 'Mechanical Eng.', status: 'Pending', idGenerated: false },
    { id: 'STU-24-003', name: 'Charlie Davis', role: 'Student', courseOrDept: 'Business Admin', status: 'Active', idGenerated: true },
    { id: 'STF-10-045', name: 'Dr. Emily Wong', role: 'Staff', courseOrDept: 'Physics Dept', status: 'Active', idGenerated: true },
    { id: 'STU-21-998', name: 'Frank Miller', role: 'Student', courseOrDept: 'Arts & Design', status: 'Graduated', idGenerated: true },
];

export function CollegeAdminOverview() {
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const columns: TableColumn<CollegeUser>[] = [
        {
            key: 'name',
            header: 'Name',
            render: (u) => (
                <div className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-slate-300 mr-2" />
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xs shrink-0">
                        {u.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.id}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'role',
            header: 'Type',
            render: (u) => (
                <Badge variant={u.role === 'Student' ? 'info' : 'warning'}>{u.role}</Badge>
            )
        },
        { key: 'courseOrDept', header: 'Course / Department' },
        {
            key: 'status',
            header: 'Status',
            render: (u) => (
                <Badge variant={u.status === 'Active' ? 'success' : u.status === 'Pending' ? 'warning' : 'default'}>
                    {u.status}
                </Badge>
            )
        },
        {
            key: 'idGenerated',
            header: 'ID Card',
            render: (u) => (
                <Badge variant={u.idGenerated ? 'info' : 'default'} className={!u.idGenerated ? 'opacity-50' : ''}>
                    {u.idGenerated ? 'Generated' : 'Not Generated'}
                </Badge>
            )
        },
        {
            key: 'actions',
            header: 'Actions',
            render: () => (
                <Button variant="ghost" size="sm">Edit</Button>
            )
        }
    ];

    const filteredUsers = mockCollegeUsers.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className={cn("text-2xl font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                        College Dashboard
                    </h1>
                    <p className={cn("text-sm mt-1", isDark ? "text-slate-400" : "text-slate-500")}>
                        Manage students, staff, and bulk ID card generation for State University.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={<CheckSquare className="w-4 h-4" />}>
                        Approve Pending
                    </Button>
                    <Button icon={<FileStack className="w-4 h-4" />} onClick={() => setIsTemplateModalOpen(true)}>
                        Select Templates
                    </Button>
                    <Button icon={<Zap className="w-4 h-4" />} variant="primary">
                        Batch Generation
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: '14,250', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Total Staff', value: '1,150', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'IDs Generated', value: '15,020', icon: FileStack, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Needs Action', value: '380', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                ].map((stat, i) => (
                    <Card key={i} className="flex items-center gap-4 p-5">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className={cn("text-sm font-medium", isDark ? "text-slate-400" : "text-slate-500")}>{stat.label}</p>
                            <p className={cn("text-2xl font-bold mt-0.5", isDark ? "text-white" : "text-slate-900")}>{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-0 overflow-hidden">
                <div className={cn("p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", isDark ? "border-white/10" : "border-slate-200")}>
                    <div className="flex items-center gap-4">
                        <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-slate-900")}>Student & Staff Directory</h2>
                        <Badge variant="info">Batch Selected: 0</Badge>
                    </div>
                    <div className="relative w-full sm:w-64 flex gap-2">
                        <div className="relative flex-1">
                            <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4", isDark ? "text-slate-500" : "text-slate-400")} />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={cn(
                                    "w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all",
                                    isDark
                                        ? "bg-[#0b1120] border border-white/10 focus:border-amber-500/50 text-white"
                                        : "bg-slate-50 border border-slate-200 focus:border-amber-500 text-slate-900"
                                )}
                            />
                        </div>
                        <Button variant="outline" size="sm" icon={<Plus className="w-4 h-4" />} />
                    </div>
                </div>
                <Table data={filteredUsers} columns={columns} className="border-0 rounded-none" />
            </Card>

            {/* Template Selection Modal */}
            <Modal
                isOpen={isTemplateModalOpen}
                onClose={() => setIsTemplateModalOpen(false)}
                title="Select ID Templates"
                maxWidth="lg"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setIsTemplateModalOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsTemplateModalOpen(false)}>Save Assignments</Button>
                    </>
                }
            >
                <div className="space-y-6">
                    <p className={cn("text-sm", isDark ? "text-slate-400" : "text-slate-600")}>
                        Assign different ID card design templates to your user groups for automatic batch generation.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Admin Template Selection */}
                        <div className={cn("p-4 rounded-xl border", isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")}>
                            <h4 className={cn("font-medium mb-3", isDark ? "text-white" : "text-slate-900")}>Student ID Template</h4>
                            <div className={cn("aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center mb-3 cursor-pointer hover:border-amber-500 transition-colors", isDark ? "border-slate-700 bg-[#0b1120]" : "border-slate-300 bg-white")}>
                                <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                                <span className="text-xs text-amber-500 font-medium font-medium">Select Template</span>
                            </div>
                            <p className="text-xs text-slate-500 text-center">Standard Blue - Vertical</p>
                        </div>

                        <div className={cn("p-4 rounded-xl border", isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")}>
                            <h4 className={cn("font-medium mb-3", isDark ? "text-white" : "text-slate-900")}>Staff ID Template</h4>
                            <div className={cn("aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center mb-3 cursor-pointer hover:border-amber-500 transition-colors", isDark ? "border-slate-700 bg-[#0b1120]" : "border-slate-300 bg-white")}>
                                <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                                <span className="text-xs text-amber-500 font-medium font-medium">Select Template</span>
                            </div>
                            <p className="text-xs text-slate-500 text-center">Premium Gold - Horizontal</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
