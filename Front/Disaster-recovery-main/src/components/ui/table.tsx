import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <table className={`w-full border-collapse text-sm ${className}`}>
      {children}
    </table>
  );
};

export const TableHeader: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <thead className={`bg-gray-50 border-b border-gray-200 ${className}`}>
      {children}
    </thead>
  );
};

export const TableBody: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableRow: React.FC<TableRowProps> = ({ children, className = '', onClick }) => {
  return (
    <tr 
      className={`border-b border-gray-200 hover:bg-gray-50 ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const TableHead: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <th className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
};

export const TableCell: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <td className={`px-4 py-3 text-sm text-gray-900 ${className}`}>
      {children}
    </td>
  );
};