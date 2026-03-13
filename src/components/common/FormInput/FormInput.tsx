import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IFormInputProps {
  label: string;
  id: string;
  type?: 'text' | 'url' | 'date';
  placeholder?: string;
  required?: boolean;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const FormInput = ({
  label,
  id,
  type = 'text',
  placeholder,
  required = false,
  registration,
  error,
}: IFormInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${type === 'date' ? 'px-3' : ''}`}
        {...registration}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
