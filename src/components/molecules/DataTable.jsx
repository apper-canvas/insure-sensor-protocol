import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import StatusBadge from '@/components/atoms/StatusBadge';

const DataTable = ({ 
  data = [], 
  columns = [], 
  onRowClick,
  sortable = true,
  pagination = true,
  pageSize = 10 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination 
    ? sortedData.slice(startIndex, startIndex + pageSize)
    : sortedData;

  const renderCellContent = (value, type) => {
    if (type === 'status') {
      return <StatusBadge status={value} />;
    }
    if (type === 'currency') {
      return `$${Number(value).toLocaleString()}`;
    }
    if (type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-semibold text-neutral-700 ${
                    sortable && column.sortable !== false ? 'cursor-pointer hover:text-primary-600' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && (
                      <div className="flex flex-col">
                        <ApperIcon 
                          name="ChevronUp" 
                          className={`w-3 h-3 ${
                            sortConfig.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-primary-600' 
                              : 'text-neutral-400'
                          }`}
                        />
                        <ApperIcon 
                          name="ChevronDown" 
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-primary-600' 
                              : 'text-neutral-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <motion.tr
                key={row.Id || index}
                className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors duration-150 ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(row)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-neutral-700">
                    {renderCellContent(row[column.key], column.type)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} results
          </p>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="ChevronLeft" className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-neutral-600">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;