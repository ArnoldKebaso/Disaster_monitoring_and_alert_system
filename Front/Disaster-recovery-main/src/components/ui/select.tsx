import React from 'react';

interface SelectProps {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  children: React.ReactNode;
}

interface OptionProps {
  value: string;
  children: React.ReactNode;
}

const Option: React.FC<OptionProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const Select = ({ id, value, onValueChange, placeholder, children }: SelectProps) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
    >
      <option value="" disabled hidden>{placeholder}</option>
      {children}
    </select>
  );
};

Select.Option = Option;

export { Select };