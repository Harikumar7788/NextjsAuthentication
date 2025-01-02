interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  color: 'gray' | 'green';
  className?: string; // Add support for custom class names
}

const Button = ({ children, onClick, type = 'button', color, className }: ButtonProps) => {
  const colors = {
    gray: 'bg-gray-500 hover:bg-gray-600',
    green: 'bg-green-500 hover:bg-green-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colors[color]} px-4 py-2 rounded text-white font-medium shadow-md transition-all duration-200 ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
