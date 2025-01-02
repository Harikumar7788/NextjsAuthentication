interface TextInputProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
  }
  
  const TextInput = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    required,
  }: TextInputProps) => {
    return (
      <div className="mb-4">
        <label className="block font-semibold mb-1">{label}</label>
        <input
          type={type}
          className="border w-full p-2 rounded"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  };
  
  export default TextInput;
  