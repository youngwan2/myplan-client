interface PropsType {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  label: string;
  placeholder: string;
}

export function InputField({
  id,
  name,
  type,
  value,
  onChange,
  error,
  label,
  placeholder,
}: PropsType) {
  const inputClass = `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
    error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
  }`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClass}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
