import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={
      `p-2 py-1 rounded-lg border border-black hover:bg-gray-800 hover:text-white 
      text-sm transition ${className}`
    }
    {...props}
  >
    {children}
  </button>
);

export default Button;