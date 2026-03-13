import type { UseFormRegisterReturn } from 'react-hook-form';

interface IFormTextareaProps {
  label: string;
  id: string;
  placeholder?: string;
  rows?: number;
  registration: UseFormRegisterReturn;
}

const FormTextarea = ({
  label,
  id,
  placeholder,
  rows = 4,
  registration,
}: IFormTextareaProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
        {...registration}
      />
    </div>
  );
};

export default FormTextarea;
