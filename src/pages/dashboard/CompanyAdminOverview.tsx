import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableColumn } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { Users, CreditCard, Activity, Plus, Search, FileDown } from 'lucide-react';

interface CompanyUser {
    id: string;
    name: string;
    role: string;
    department: string;
    status: 'Active' | 'Pending' | 'Inactive';
    idGenerated: boolean;
}

const mockCompanyUsers: CompanyUser[] = [
    { id: 'UID-001', name: 'John Doe', role: 'Software Engineer', department: 'Engineering', status: 'Active', idGenerated: true },
    { id: 'UID-002', name: 'Jane Smith', role: 'Product Manager', department: 'Product', status: 'Active', idGenerated: true },
    { id: 'UID-003', name: 'Mike Johnson', role: 'Marketing Specialist', department: 'Marketing', status: 'Pending', idGenerated: false },
    { id: 'UID-004', name: 'Sarah Williams', role: 'HR Director', department: 'Human Resources', status: 'Active', idGenerated: true },
    { id: 'UID-005', name: 'Tom Davis', role: 'Sales Rep', department: 'Sales', status: 'Inactive', idGenerated: true },
];

export function CompanyAdminOverview() {
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const columns: TableColumn<CompanyUser>[] = [
        {
            key: 'name',
            header: 'Employee Name',
            render: (u) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs shrink-0">
                        {u.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.id}</p>
                    </div>
                </div>
            )
        },
        { key: 'department', header: 'Department' },
        { key: 'role', header: 'Role' },
        {
            key: 'status',
            header: 'Account Status',
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

    const filteredUsers = mockCompanyUsers.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className={cn("text-2xl font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                        Company Dashboard
                    </h1>
                    <p className={cn("text-sm mt-1", isDark ? "text-slate-400" : "text-slate-500")}>
                        Manage your employees and ID cards for TechCorp Solutions.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={<FileDown className="w-4 h-4" />}>
                        Export List
                    </Button>
                    <Button icon={<Plus className="w-4 h-4" />} onClick={() => setIsNewUserModalOpen(true)}>
                        Add Employee
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Employees', value: '1,250', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'IDs Generated', value: '1,120', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Pending Requests', value: '14', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
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
                    <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-slate-900")}>Employee Directory</h2>
                    <div className="relative w-full sm:w-64">
                        <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4", isDark ? "text-slate-500" : "text-slate-400")} />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={cn(
                                "w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all",
                                isDark
                                    ? "bg-[#0b1120] border border-white/10 focus:border-blue-500/50 text-white"
                                    : "bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-900"
                            )}
                        />
                    </div>
                </div>
                <Table data={filteredUsers} columns={columns} className="border-0 rounded-none" />
            </Card>

            {/* Add Employee Modal */}
            <Modal
                isOpen={isNewUserModalOpen}
                onClose={() => setIsNewUserModalOpen(false)}
                title="Add New Employee"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setIsNewUserModalOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsNewUserModalOpen(false)}>Save Employee</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={cn("text-sm font-medium", isDark ? "text-slate-300" : "text-slate-700")}>First Name</label>
                            <input type="text" className={cn("w-full px-3 py-2 rounded-lg text-sm border outline-none", isDark ? "bg-[#0b1120] border-white/10 text-white focus:border-blue-500" : "bg-white border-slate-200 text-slate-900 focus:border-blue-500")} />
                        </div>
                        <div className="space-y-1.5">
                            <label className={cn("text-sm font-medium", isDark ? "text-slate-300" : "text-slate-700")}>Last Name</label>
                            <input type="text" className={cn("w-full px-3 py-2 rounded-lg text-sm border outline-none", isDark ? "bg-[#0b1120] border-white/10 text-white focus:border-blue-500" : "bg-white border-slate-200 text-slate-900 focus:border-blue-500")} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className={cn("text-sm font-medium", isDark ? "text-slate-300" : "text-slate-700")}>Email Address</label>
                        <input type="email" className={cn("w-full px-3 py-2 rounded-lg text-sm border outline-none", isDark ? "bg-[#0b1120] border-white/10 text-white focus:border-blue-500" : "bg-white border-slate-200 text-slate-900 focus:border-blue-500")} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className={cn("text-sm font-medium", isDark ? "text-slate-300" : "text-slate-700")}>Department</label>
                            <input type="text" className={cn("w-full px-3 py-2 rounded-lg text-sm border outline-none", isDark ? "bg-[#0b1120] border-white/10 text-white focus:border-blue-500" : "bg-white border-slate-200 text-slate-900 focus:border-blue-500")} />
                        </div>
                        <div className="space-y-1.5">
                            <label className={cn("text-sm font-medium", isDark ? "text-slate-300" : "text-slate-700")}>Job Role</label>
                            <input type="text" className={cn("w-full px-3 py-2 rounded-lg text-sm border outline-none", isDark ? "bg-[#0b1120] border-white/10 text-white focus:border-blue-500" : "bg-white border-slate-200 text-slate-900 focus:border-blue-500")} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="auto-generate" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="auto-generate" className={cn("text-sm", isDark ? "text-slate-300" : "text-slate-700")}>Auto-generate ID card request upon creation</label>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
