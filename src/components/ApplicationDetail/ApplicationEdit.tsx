import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useToastStore from '../../stores/toastStore';
import type { IApplicationFormData, IJobApplication } from '../../types';
import ApplicationFormFields from '../ApplicationFormFields';

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
  } = useForm<IApplicationFormData>({
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

  const onSubmit = async (data: IApplicationFormData) => {
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
