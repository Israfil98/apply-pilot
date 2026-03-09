import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ConfirmModal } from '../components/common';
import { ApplicationsTable, StatusFilter } from '../components/JobApplications';
import useApplications from '../hooks/useApplications';
import type { TApplicationStatus } from '../types';

const ApplicationsPage = () => {
  const { applications, loading, error, deleteApplication } = useApplications();
  const [activeStatus, setActiveStatus] = useState<TApplicationStatus | 'All'>(
    'All',
  );

  // Track which application ID is pending deletion — null means modal is closed
  // We store the ID instead of a boolean so we know which one to delete on confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredApplications = useMemo(() => {
    if (activeStatus === 'All') return applications;
    return applications.filter((app) => app.status === activeStatus);
  }, [applications, activeStatus]);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    await deleteApplication(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Page header with add button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">My Applications</h1>
        <Link
          to="/applications/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Application
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <StatusFilter
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <ApplicationsTable
          applications={filteredApplications}
          onDelete={(id) => setDeleteId(id)}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <ConfirmModal
          title="Delete Application"
          message="Are you sure you want to delete this application? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          variant="danger"
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;
