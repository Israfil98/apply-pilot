import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useToastStore from '../../stores/toastStore';
import type { IJobApplication, TApplicationStatus } from '../../types';

interface IEditFormData {
  company: string;
  position: string;
  status: TApplicationStatus;
  applied_date: string;
  url: string;
  notes: string;
  salary: string;
  location: string;
}

interface IApplicationEditProps {
  application: IJobApplication;
  onUpdate: (
    id: string,
    updates: Partial<Omit<IJobApplication, 'id' | 'user_id' | 'created_at'>>,
  ) => Promise<{
    data: IJobApplication | null;
    error: { message: string } | null;
  }>;
  onCancel: () => void;
}

const STATUS_OPTIONS: TApplicationStatus[] = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

const ApplicationEdit = ({
  application,
  onUpdate,
  onCancel,
}: IApplicationEditProps) => {
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IEditFormData>({
    // Pre-fill form with current data
    // ?? '' converts null values back to empty strings for inputs
    defaultValues: {
      company: application.company,
      position: application.position,
      status: application.status,
      applied_date: application.applied_date,
      url: application.url ?? '',
      notes: application.notes ?? '',
      salary: application.salary ?? '',
      location: application.location ?? '',
    },
  });

  const onSubmit = async (data: IEditFormData) => {
    const { error } = await onUpdate(application.id, {
      company: data.company,
      position: data.position,
      status: data.status,
      applied_date: data.applied_date,
      url: data.url || null,
      notes: data.notes || null,
      salary: data.salary || null,
      location: data.location || null,
    });

    if (error) {
      addToast(error.message, 'error');
      return;
    }

    addToast('Application updated successfully', 'success');
    onCancel();
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          {/* Company — required */}
          <div>
            <label
              htmlFor="company"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Company <span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('company', {
                required: 'Company name is required',
              })}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Position — required */}
          <div>
            <label
              htmlFor="position"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Position <span className="text-red-500">*</span>
            </label>
            <input
              id="position"
              type="text"
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.position ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('position', {
                required: 'Position is required',
              })}
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-500">
                {errors.position.message}
              </p>
            )}
          </div>

          {/* Status + Applied Date */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full appearance-none rounded-lg border border-gray-300 bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-size-[16px_16px] bg-position-[right_12px_center] bg-no-repeat px-4 py-2.5 pr-10 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register('status')}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="applied_date"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Applied Date
              </label>
              <input
                id="applied_date"
                type="date"
                className="w-full min-w-0 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register('applied_date')}
              />
            </div>
          </div>

          {/* URL + Location */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="url"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Job URL
              </label>
              <input
                id="url"
                type="url"
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register('url')}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g. Remote, San Francisco, CA"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register('location')}
              />
            </div>
          </div>

          {/* Salary */}
          <div>
            <label
              htmlFor="salary"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Salary
            </label>
            <input
              id="salary"
              type="text"
              placeholder="e.g. $120,000 - $150,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register('salary')}
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Any notes about this application..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register('notes')}
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationEdit;
