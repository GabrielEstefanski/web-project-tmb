import { useState } from "react";

interface MoneyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  required?: boolean;
}

const MoneyInput = ({ id, label, value, onChange, disabled=false, required=false }: MoneyInputProps) => {
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function parseCurrency(value: string) {
    return Number(value.replace(/\D/g, "")) / 100;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseCurrency(rawValue);

    setDisplayValue(formatCurrency(numericValue));
    onChange(numericValue);
  };

  const inputClassNames = `block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                          shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700
                          dark:text-white dark:border-gray-600 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300">
          <i className="fa fa-money-bill-wave" />
        </span>
        <input
          id={id}
          type="text"
          value={displayValue}
          onChange={handleChange}
          className={inputClassNames}
          disabled={disabled}
          required={required}
        />
      </div>
    </div>
  );
};

export default MoneyInput;
