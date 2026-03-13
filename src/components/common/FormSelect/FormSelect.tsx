import type { UseFormRegisterReturn } from 'react-hook-form';

interface IFormSelectProps {
  label: string;
  id: string;
  options: string[];
  registration: UseFormRegisterReturn;
}

const FormSelect = ({ label, id, options, registration }: IFormSelectProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={id}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-size-[16px_16px] bg-position-[right_12px_center] bg-no-repeat px-4 py-2.5 pr-10 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
        {...registration}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
