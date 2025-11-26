
import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string; // Leading icon (material symbol name)
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  rightElement, 
  containerClassName = '', 
  className = '',
  type = 'text',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label className={`flex flex-col w-full ${containerClassName}`}>
      {label && <p className="text-white text-base font-medium leading-normal pb-2">{label}</p>}
      <div 
        className={`flex w-full items-center rounded-xl bg-[#2A2A2A] border transition-all ${
          isFocused ? 'ring-2 ring-primary/50 border-transparent' : 'border-transparent'
        }`}
      >
        {icon && (
          <div className="pl-4 text-gray-400">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
        <input 
          type={type}
          className={`flex-1 bg-transparent border-none text-white placeholder:text-gray-500 p-4 text-base focus:ring-0 focus:outline-none ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightElement && (
          <div className="pr-2">
            {rightElement}
          </div>
        )}
      </div>
    </label>
  );
};

export default Input;
