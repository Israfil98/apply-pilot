import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useApplications from '../../hooks/useApplications';
import useToastStore from '../../stores/toastStore';
import type { IApplicationFormData } from '../../types';
import ApplicationFormFields from '../ApplicationFormFields';

const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

const AddApplicationForm = () => {
  const navigate = useNavigate();
  const { addApplication } = useApplications();
  const { addToast } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IApplicationFormData>({
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

  const onSubmit = async (data: IApplicationFormData) => {
    try {
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

      addToast('Application added successfully', 'success');
      navigate('/applications');
    } catch (error) {
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

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <ApplicationFormFields register={register} errors={errors} />

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
