import React, { useState, useMemo } from 'react';

// FIX: Export Column interface for use in other components
export interface Column<T> {
  accessor: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title: string;
  onAddNew?: () => void;
}

const SortIcon: React.FC<{ direction?: 'asc' | 'desc' }> = ({ direction }) => {
    if (!direction) {
        return <span className="text-gray-400">↕</span>;
    }
    return direction === 'asc' ? <span className="text-primary">↑</span> : <span className="text-primary">↓</span>;
};

export const DataTable = <T extends { id: string }>(
  { columns, data, title, onAddNew }: DataTableProps<T>
) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  return (
    <div className="p-6">
      <div className="bg-surface rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
            {onAddNew && (
              <button onClick={onAddNew} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                  + Add New
              </button>
            )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-text-secondary">
            <thead className="text-xs text-text-primary uppercase bg-background">
              <tr>
                {columns.map(col => (
                  <th key={String(col.accessor)} scope="col" className="px-6 py-3" onClick={() => requestSort(col.accessor)}>
                    <div className="flex items-center cursor-pointer">
                      {col.header}
                      <span className="ml-1"><SortIcon direction={sortConfig?.key === col.accessor ? sortConfig.direction : undefined} /></span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map(item => (
                <tr key={item.id} className="bg-surface border-b hover:bg-gray-50">
                  {columns.map(col => (
                    <td key={String(col.accessor)} className="px-6 py-4">
                      {col.render ? col.render(item) : String(item[col.accessor] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};