import React from 'react';

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void; // Now expects direct string value
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  children, 
  value, 
  onChange, 
  className = '' 
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)} // Handle event internally
      className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm ${className}`}
    >
      {children}
    </select>
  );
};