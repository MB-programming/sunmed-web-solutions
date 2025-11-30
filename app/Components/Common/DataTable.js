'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import LoadingSpinner from './LoadingSpinner';

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
  actions = true,
}) => {
  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-white/60">
        <Icon icon="mdi:database-off" className="mx-auto mb-2" width="48" height="48" />
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-stroke">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left px-4 py-3 text-white/80 font-semibold text-sm"
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-stroke/50 hover:bg-background/20 transition-colors"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-white text-sm">
                  {column.render ? column.render(row) : row[column.field]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                        title="View"
                      >
                        <Icon icon="mdi:eye" width="20" height="20" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-green-400 hover:text-green-300 transition-colors p-1"
                        title="Edit"
                      >
                        <Icon icon="mdi:pencil" width="20" height="20" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                        title="Delete"
                      >
                        <Icon icon="mdi:delete" width="20" height="20" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
