import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col space-y-1">
    {label && <label className="text-sm text-gray-700 font-medium">{label}</label>}
    <input
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      {...props}
    />
    {error && <span className="text-sm text-red-500">{error}</span>}
  </div>
);

export default Input; 