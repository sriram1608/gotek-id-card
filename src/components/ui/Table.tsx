import React, { ReactNode } from 'react';

import { cn } from '../../lib/utils';

export interface TableColumn<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    className?: string;
}

export function Table<T extends Record<string, any>>({ data, columns, className }: TableProps<T>) {

    return (
        <div className={cn(
            "overflow-x-auto rounded-lg border",
            "border-slate-200",
            className
        )}>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className={cn(
                        "border-b",
                        "border-slate-200 bg-slate-50"
                    )}>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={cn(
                                    "px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left",
                                    "text-slate-500"
                                )}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={cn(
                    "divide-y",
                    "divide-slate-200"
                )}>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center text-sm text-slate-500">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((item, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={cn(
                                    "transition-colors hover:bg-black/5 dark:hover:bg-white/5",
                                    "text-slate-700"
                                )}
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className="px-6 py-4 text-sm whitespace-nowrap">
                                        {col.render ? col.render(item) : item[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
