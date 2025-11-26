
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  isLoading?: boolean;
  icon?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon, 
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "h-12 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-background-dark hover:bg-yellow-400",
    secondary: "bg-[#2A2A2A] text-white hover:bg-[#333]",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    ghost: "bg-transparent text-gray-400 hover:text-white",
    outline: "bg-transparent border border-white/10 text-white hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
      ) : (
        <>
          {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
