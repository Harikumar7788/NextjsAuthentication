interface TextInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string; // Allow passing a custom className
}

const TextInput = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  className, // Include className in destructuring
}: TextInputProps) => {
  return (
    <div className={`mb-6 ${className || ''}`}> {/* Allow custom classes */}
      <label className="block font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        className="border border-gray-300 w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 hover:border-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextInput;
