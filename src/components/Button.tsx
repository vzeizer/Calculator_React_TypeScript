import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (value: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      className={`p-4 rounded-lg text-2xl font-semibold transition-colors duration-200 ${className}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Button;