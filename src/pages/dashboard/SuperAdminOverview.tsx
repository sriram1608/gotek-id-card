import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableColumn } from '../../components/ui/Table';
import { HierarchyTree } from '../../components/dashboard/HierarchyTree';
import { Building2, Users, Activity, GraduationCap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

interface OrgData {
    id: string;
    name: string;
    type: 'Company' | 'College';
    admin: string;
    users: number;
    status: 'Active' | 'Inactive';
}

const mockOrganizations: OrgData[] = [
    { id: '1', name: 'TechCorp Solutions', type: 'Company', admin: 'Sarah Tech', users: 1250, status: 'Active' },
    { id: '2', name: 'State University', type: 'College', admin: 'Prof. Smith', users: 15400, status: 'Active' },
    { id: '3', name: 'Global Logistics', type: 'Company', admin: 'Mike Manager', users: 840, status: 'Active' },
    { id: '4', name: 'City High School', type: 'College', admin: 'Principal Doe', users: 2100, status: 'Inactive' },
];

export function SuperAdminOverview() {
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const columns: TableColumn<OrgData>[] = [
        { key: 'name', header: 'Organization' },
        {
            key: 'type',
            header: 'Type',
            render: (item) => (
                <span className="flex items-center gap-2">
                    {item.type === 'Company' ? <Building2 className="w-4 h-4 text-blue-500" /> : <GraduationCap className="w-4 h-4 text-amber-500" />}
                    {item.type}
                </span>
            )
        },
        { key: 'admin', header: 'Primary Admin' },
        { key: 'users', header: 'Total Users', render: (item) => item.users.toLocaleString() },
        {
            key: 'status',
            header: 'Status',
            render: (item) => (
                <Badge variant={item.status === 'Active' ? 'success' : 'default'}>
                    {item.status}
                </Badge>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className={cn("text-2xl font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                    Super Admin Dashboard
                </h1>
                <p className={cn("text-sm mt-1", isDark ? "text-slate-400" : "text-slate-500")}>
                    System overview and hierarchy management.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Organizations', value: '1,429', icon: Building2, trend: '+12% this month', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Total End Users', value: '2.4M', icon: Users, trend: '+5% this month', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Cards Generated', value: '1.8M', icon: Activity, trend: '+18% this month', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Colleges', value: '342', icon: GraduationCap, trend: 'stable', color: 'text-amber-500', bg: 'bg-amber-500/10' }
                ].map((stat, i) => (
                    <Card key={i} className="flex items-center gap-4 p-5">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className={cn("text-sm font-medium", isDark ? "text-slate-400" : "text-slate-500")}>{stat.label}</p>
                            <p className={cn("text-2xl font-bold mt-0.5", isDark ? "text-white" : "text-slate-900")}>{stat.value}</p>
                            <p className="text-xs text-emerald-500 mt-1">{stat.trend}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-3">
                    <Card className="p-6">
                        <h2 className={cn("text-lg font-semibold mb-6", isDark ? "text-white" : "text-slate-900")}>System Hierarchy</h2>
                        <HierarchyTree />
                    </Card>
                </div>

                <div className="xl:col-span-3">
                    <Card className="p-0 overflow-hidden">
                        <div className={cn("p-6 border-b", isDark ? "border-white/10" : "border-slate-200")}>
                            <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-slate-900")}>Recent Organizations</h2>
                        </div>
                        <Table data={mockOrganizations} columns={columns} className="border-0 rounded-none" />
                    </Card>
                </div>
            </div>
        </div>
    );
}
