import { ArrowLeft, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useToastStore from '../../stores/toastStore';
import type { IJobApplication, TApplicationStatus } from '../../types';
import { ConfirmModal } from '../common';

interface IApplicationViewProps {
  application: IJobApplication;
  onEdit: () => void;
  onDelete: (id: string) => Promise<{ error: { message: string } | null }>;
}

const STATUS_STYLES: Record<TApplicationStatus, string> = {
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-amber-100 text-amber-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

const ApplicationView = ({
  application,
  onEdit,
  onDelete,
}: IApplicationViewProps) => {
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToastStore();

  const handleDelete = async () => {
    setDeleteError('');
    setIsDeleting(true);

    const { error } = await onDelete(application.id);

    if (error) {
      setDeleteError(error.message);
      setIsDeleting(false);
      setShowDeleteModal(false);
      addToast(error.message, 'error');
      return;
    }

    addToast('Application deleted successfully', 'success');
    navigate('/applications');
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/applications"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {application.position}
            </h1>
            <p className="mt-1 text-lg text-gray-500">{application.company}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_STYLES[application.status]}`}
          >
            {application.status}
          </span>
        </div>
      </div>

      {/* Details card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {/* Applied Date — always shown */}
          <div>
            <p className="text-sm font-medium text-gray-500">Applied Date</p>
            <p className="mt-0.5 text-gray-900">
              {new Date(
                application.applied_date + 'T00:00:00',
              ).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Optional fields — only rendered if they have a value */}
          {application.location && (
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="mt-0.5 text-gray-900">{application.location}</p>
            </div>
          )}

          {application.salary && (
            <div>
              <p className="text-sm font-medium text-gray-500">Salary</p>
              <p className="mt-0.5 text-gray-900">{application.salary}</p>
            </div>
          )}

          {application.url && (
            <div>
              <p className="text-sm font-medium text-gray-500">Job URL</p>
              href={application.url}
              target="_blank" rel="noopener noreferrer" className="mt-0.5
              inline-flex items-center gap-1 text-blue-600 hover:underline"
              <a>
                {application.url}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {application.notes && (
            <div>
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p className="mt-0.5 whitespace-pre-wrap text-gray-900">
                {application.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex items-center gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>

        {deleteError && (
          <p className="mt-3 text-sm text-red-500">{deleteError}</p>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <ConfirmModal
          title="Delete Application"
          message="Are you sure you want to delete this application? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          variant="danger"
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ApplicationView;
