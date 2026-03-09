import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useApplications from '../../hooks/useApplications';
import useToastStore from '../../stores/toastStore';
import { type TApplicationStatus } from '../../types';

// Form data shape — matches the fields the user fills in
// This is NOT the same as IJobApplication (which includes id, user_id, created_at from the DB)
interface IAddApplicationFormData {
  company: string;
  position: string;
  status: TApplicationStatus;
  applied_date: string;
  url: string;
  notes: string;
  salary: string;
  location: string;
}

// Status options defined outside the component — static data that never changes,
// so it won't be recreated on every render
const STATUS_OPTIONS: TApplicationStatus[] = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

// Helper to get today's date in YYYY-MM-DD format for the date input's default value
const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

const AddApplicationForm = () => {
  const navigate = useNavigate();
  const { addApplication } = useApplications();
  const { addToast } = useToastStore();

  const {
    register, // Connects inputs to React Hook Form (handles value, onChange, onBlur, ref)
    handleSubmit, // Wraps our submit fn — only calls it if validation passes
    formState: { errors, isSubmitting },
    // isSubmitting tracks whether our async onSubmit is in progress
    // This lets us disable the button and show "Adding..." to prevent double submits
  } = useForm<IAddApplicationFormData>({
    defaultValues: {
      company: '',
      position: '',
      status: 'Applied',
      applied_date: getTodayDate(),
      url: '',
      notes: '',
      salary: '',
      location: '',
    },
  });

  const onSubmit = async (data: IAddApplicationFormData) => {
    try {
      // Only send non-empty optional fields to Supabase
      // This avoids storing empty strings — null is cleaner in the DB
      const { error } = await addApplication({
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

      // After successful insert, navigate to the applications list
      // The user will see their new application in the table
      addToast('Application added successfully', 'success');
      navigate('/applications');
    } catch (error) {
      // Error is already handled inside useApplications hook
      // (it sets an error state), but we catch here to prevent
      // unhandled promise rejection
      console.error('Failed to add application:', error);
      addToast('Failed to add application. Please try again.', 'error');
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Add New Application
        </h1>
        <p className="mt-1 text-gray-500">
          Track a new job application you've submitted.
        </p>
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
              placeholder="e.g. Google"
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
              placeholder="e.g. Frontend Developer"
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

          {/* Status + Applied Date — side by side on larger screens */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register('status')}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Applied Date */}
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
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                {...register('applied_date')}
              />
            </div>
          </div>

          {/* URL + Location — side by side */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* URL */}
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

            {/* Location */}
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
              {isSubmitting ? 'Adding...' : 'Add Application'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/applications')}
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

export default AddApplicationForm;
