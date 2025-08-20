import  { useState, useMemo } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleRow = (row: T) => {
    let updatedRows: T[] = [];
    if (selectedRows.some(r => r.id === row.id)) {
      updatedRows = selectedRows.filter(r => r.id !== row.id);
    } else {
      
      updatedRows = selectable ? [...selectedRows, row] : [row];
    }
    setSelectedRows(updatedRows);
    onRowSelect?.(updatedRows);
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (data.length === 0) return <div className="p-4">No data available.</div>;

  const handleSort = (key: keyof T) => {
    if (sortKey === key) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const renderCell = (value: unknown) => (value != null ? String(value) : '-');

  return (
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2"></th>}
          {columns.map(col => (
            <th
              key={col.key}
              className="p-2 cursor-pointer"
              onClick={() => col.sortable && handleSort(col.dataIndex)}
            >
              {col.title} {sortKey === col.dataIndex ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map(row => (
          <tr
            key={row.id}
            className={`border-t ${selectedRows.some(r => r.id === row.id) ? 'bg-blue-100' : ''}`}
          >
            {selectable && (
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.some(r => r.id === row.id)}
                  onChange={() => toggleRow(row)}
                />
              </td>
            )}
            {columns.map(col => (
              <td key={col.key} className="p-2">
                {renderCell(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
