interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    color: 'gray' | 'green';
  }
  
  const Button = ({ children, onClick, type = 'button', color }: ButtonProps) => {
    const colors = {
      gray: 'bg-gray-500',
      green: 'bg-green-500',
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${colors[color]} px-4 py-2 rounded text-white`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  