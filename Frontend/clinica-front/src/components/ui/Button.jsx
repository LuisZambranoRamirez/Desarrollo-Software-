const variantStyles = {
  primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]',
  secondary: 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A]',
  success: 'bg-[#10B981] text-white hover:bg-[#059669]',
  warning: 'bg-[#F59E0B] text-white hover:bg-[#D97706]',
  error: 'bg-[#EF4444] text-white hover:bg-[#DC2626]',
  outline: 'border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white',
  ghost: 'text-[#2563EB] hover:bg-[#EFF6FF]',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

function Button({ variant = 'primary', size = 'md', children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
