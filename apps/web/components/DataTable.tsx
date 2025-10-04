import { ReactNode } from 'react';

type Column<T> = {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  emptyState?: ReactNode;
  rowClassName?: (row: T) => string;
};

export function DataTable<T>({ data, columns, emptyState, rowClassName }: DataTableProps<T>) {
  if (data.length === 0) {
    return <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">{emptyState}</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
          <tr>
            {columns.map((column) => (
              <th key={column.header} scope="col" className={`px-4 py-3 ${column.className ?? ''}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-700">
          {data.map((row, index) => (
            <tr key={index} className={`hover:bg-gray-50 ${rowClassName ? rowClassName(row) : ''}`}>
              {columns.map((column) => (
                <td key={column.header} className={`px-4 py-3 ${column.className ?? ''}`}>
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
