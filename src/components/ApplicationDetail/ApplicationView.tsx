import { ArrowLeft, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { formatDateLong } from '../../lib/formatDate';
import useToastStore from '../../stores/toastStore';
import type { IJobApplication } from '../../types';
import { ConfirmModal, StatusBadge } from '../common';
interface IApplicationViewProps {
  application: IJobApplication;
  onEdit: () => void;
  onDelete: (id: string) => Promise<{ error: { message: string } | null }>;
}

// Small helper — only used in this file, so it stays here
const DetailField = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <div className="mt-0.5">{children}</div>
  </div>
);

const ApplicationView = ({
  application,
  onEdit,
  onDelete,
}: IApplicationViewProps) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToastStore();

  const handleDelete = async () => {
    setIsDeleting(true);

    const { error } = await onDelete(application.id);

    if (error) {
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
          <StatusBadge status={application.status} />
        </div>
      </div>

      {/* Details card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <DetailField label="Applied Date">
            <p className="text-gray-900">
              {formatDateLong(application.applied_date)}
            </p>
          </DetailField>

          {application.location && (
            <DetailField label="Location">
              <p className="text-gray-900">{application.location}</p>
            </DetailField>
          )}

          {application.salary && (
            <DetailField label="Salary">
              <p className="text-gray-900">{application.salary}</p>
            </DetailField>
          )}

          {application.url && (
            <DetailField label="Job URL">
              <a
                href={application.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
              >
                {application.url}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </DetailField>
          )}

          {application.notes && (
            <DetailField label="Notes">
              <p className="whitespace-pre-wrap text-gray-900">
                {application.notes}
              </p>
            </DetailField>
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
