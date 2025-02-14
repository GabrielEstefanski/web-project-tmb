import { ReactNode } from "react";

interface CustomInputProps {
  id: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const CustomInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  className,
  disabled = false,
  required = false
}: CustomInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClassNames = `block py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md
                          sm:min-w-40 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative mt-1">
        {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300">{icon}</span>}
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClassNames}
          disabled={disabled}
          required={required}
        />
      </div>
    </div>
  );
};

export default CustomInput;
