import React from 'react';

export default function Button({ onClick, disabled, variant = 'primary', children }) {
  const baseStyle = "px-5 py-2 rounded-lg font-bold text-base transition-colors duration-200";
  const primaryStyle = "bg-blue-500 text-white hover:bg-blue-600";
  const disabledStyle = "opacity-50 cursor-not-allowed hover:bg-blue-500";

  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`${baseStyle} ${primaryStyle} ${disabled ? disabledStyle : ''}`}
    >
      {children}
    </button>
  );
}